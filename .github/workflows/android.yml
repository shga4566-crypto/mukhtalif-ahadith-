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
      - uses: actions/checkout@v4

      # ۱. جاوا ۲۱ (د Gradle د ستونزو لپاره)
      - name: set up JDK 21
        uses: actions/setup-java@v4
        with:
          java-version: '21'
          distribution: 'zulu'

      # د ډیپینډنسيګانو نصبول
      - name: Install dependencies
        run: |
          npm install --legacy-peer-deps
          # د Vite د build ستونزې حل لپاره react-is نصبوو
          npm install react-is --legacy-peer-deps
          # د Capacitor اړین کتابتونونه انسټالول
          npm install @capacitor/core @capacitor/cli @capacitor/android @capacitor/assets --legacy-peer-deps

      - name: Build Web App
        run: npm run build

      # د Capacitor برخه (اصلاح شوې)
      - name: Sync with Capacitor
        run: |
          # که چېرې د android فولډر له مخکې شتون ونلري، نو اضافه یې کړه
          if [ ! -d "android" ]; then
            echo "Android platform missing. Adding it now..."
            npx cap add android
          else
            echo "Android platform already exists."
          fi
          # د وب کوډ او پلګینونو همغږي کول له انډرایډ سره
          npx cap sync android

      # ۲. د آیکن برخه
      - name: Generate Icon
        run: |
          if [ -f "logo.png" ]; then
            mkdir -p assets
            cp logo.png assets/icon.png
            npx capacitor-assets generate --android
          else
            echo "Warning: logo.png not found, skipping icon generation."
          fi

      # ۳. د انټرنیټ او سټوریج اجازې (Permissions)
      - name: Inject Permissions and Fix Name
        run: |
          cd android/app/src/main
          
          # په AndroidManifest.xml کې د انټرنیټ او سټوریج اجازې ورزیاتوو
          sed -i 's/<application/<uses-permission android:name="android.permission.INTERNET" \/>\n    <uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE"\/>\n    <uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" \/>\n    <application/g' AndroidManifest.xml
          
          # د ډاونلوډ لپاره "ClearText" او "Legacy Storage" فعاله کوو
          sed -i 's/<application/<application android:usesCleartextTraffic="true" android:requestLegacyExternalStorage="true"/g' AndroidManifest.xml
          
          # د ډاډ لپاره د فایل چاپول
          cat AndroidManifest.xml

      # ۴. د Kotlin د تکراري فایلونو ستونزه (Fix)
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

      # ۵. د انډرایډ د APK جوړول
      - name: Build Android APK
        run: |
          cd android
          chmod +x gradlew
          ./gradlew assembleDebug

      # ۶. د جوړ شوي APK پورته کول (Upload)
      - name: Upload APK
        uses: actions/upload-artifact@v4
        with:
          name: hadise-APK
          path: android/app/build/outputs/apk/debug/app-debug.apk 
