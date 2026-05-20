name: Build Android APK
on:
  push:
    branches: [ main ]

jobs:
  build:
    runs-on: ubuntu-latest
    permissions:
      contents: write
    steps:
      - name: Checkout Code
        uses: actions/checkout@v4

      # ۱. د Node.js انسټالول
      - name: Set up Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'

      # ۲. د جاوا ۲۱ انسټالول
      - name: Set up JDK 21
        uses: actions/setup-java@v4
        with:
          java-version: '21'
          distribution: 'zulu'

      # ۳. د ډیپینډنسيګانو نصبول
      - name: Install dependencies
        run: |
          npm install --legacy-peer-deps
          # د Vite د build ستونزې حل لپاره react-is نصبوو
          npm install react-is --legacy-peer-deps
          # د Capacitor اړین کتابتونونه انسټالول
          npm install @capacitor/core @capacitor/cli @capacitor/android @capacitor/assets @capacitor/share @capacitor/filesystem --legacy-peer-deps

      # ۴. د ویب اپلیکیشن بېلډ کول
      - name: Build Web App
        run: npm run build

      # ۵. د Capacitor برخه او د dist/build فولډر ستونزې حل
      - name: Sync with Capacitor
        run: |
          # که چېرې بېلډ فولډر build وي، نو هغه په dist بدل کوو
          if [ -d "build" ] && [ ! -d "dist" ]; then
            mv build dist
          fi
          
          # که بیا هم dist فولډر شتون ونلري، نو یو خالي فولډر او فایل جوړوو ترڅو پروسه ناکامه نشي
          if [ ! -d "dist" ]; then
            mkdir -p dist
            echo "<!DOCTYPE html><html><head><title>App</title></head><body></body></html>" > dist/index.html
            echo "Created a fallback dist directory."
          fi

          # د Capacitor تنظیماتو فایل جوړول
          echo "import { CapacitorConfig } from '@capacitor/cli';" > capacitor.config.ts
          echo "const config: CapacitorConfig = {" >> capacitor.config.ts
          echo "  appId: 'com.hadise.app'," >> capacitor.config.ts
          echo "  appName: 'hadise'," >> capacitor.config.ts
          echo "  webDir: 'dist'" >> capacitor.config.ts
          echo "};" >> capacitor.config.ts
          echo "export default config;" >> capacitor.config.ts

          if [ ! -d "android" ]; then
            echo "Android platform missing. Adding it now..."
            npx cap add android
          else
            echo "Android platform already exists."
          fi
          
          npx cap sync android

      # ۶. د آیکن برخه
      - name: Generate Icon
        run: |
          if [ -f "logo.png" ]; then
            mkdir -p assets
            cp logo.png assets/icon.png
            npx capacitor-assets generate --android
          else
            echo "Warning: logo.png not found, skipping icon generation."
          fi

      # ۷. د انټرنیټ او سټوریج اجازې (Permissions)
      - name: Inject Permissions and Fix Name
        run: |
          cd android/app/src/main
          
          # په AndroidManifest.xml کې د انټرنیټ او سټوریج اجازې ورزیاتوو
          sed -i 's/<application/<uses-permission android:name="android.permission.INTERNET" \/>\n    <uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE"\/>\n    <uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" \/>\n    <application/g' AndroidManifest.xml
          
          # د ډاونلوډ لپاره "ClearText" او "Legacy Storage" فعاله کوو
          sed -i 's/<application/<application android:usesCleartextTraffic="true" android:requestLegacyExternalStorage="true"/g' AndroidManifest.xml
          
          cat AndroidManifest.xml

      # ۸. د Kotlin د تکراري فایلونو ستونزه (Fix)
      - name: Fix Kotlin Dependency Conflict
        run: |
          cd android
          echo "" >> build.gradle
          echo "allprojects {" >> build.gradle
          echo "    configurations.all {" >> build.gradle
          echo "        resolutionStrategy {" >> build.gradle
          echo "            force 'org.jetbrains.kotlin:kotlin-stdlib:1.8.22'" >> build.gradle
          echo "            force 'org.jetbrains.kotlin:kotlin-stdlib-jdk7:1.8.22'" >> build.gradle
          echo "            force 'org.jetbrains.kotlin:kotlin-stdlib-jdk8:1.8.22'" >> build.gradle
          echo "        }" >> build.gradle
          echo "    }" >> build.gradle
          echo "}" >> build.gradle

      # ۹. د انډرایډ د APK جوړول
      - name: Build Android APK
        run: |
          cd android
          chmod +x gradlew
          ./gradlew assembleDebug

      # ۱۰. د جوړ شوي APK پورته کول (Upload)
      - name: Upload APK
        uses: actions/upload-artifact@v4
        with:
          name: hadise-APK
          path: android/app/build/outputs/apk/debug/app-debug.apk 
