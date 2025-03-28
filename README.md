# Purple Store

Purple Store is mobile e-commerce apps. Cooked by React Native CLI. This project just for showcase and add to my portfolio. If you guys want to contribute or want to continue develop this apps, you can fork this project.

## Feature

- Home Page
  - List Product
  - List Product Category
  - Search Product
- Detail Product
  - Detail product description
  - Like / Favorite Product
  - Add to cart
- Favorite
  - List of all faavorite product
- Cart
  - List of all prodcut that has been add
  - Add quantity selected product
  - Remove product from cart
- Checkout
  - List Product to pay
  - Payment method
  - Notification payment success / failed
  - Update cart after product payment
- Profile
  - Show user profile

## How to start develop

1 . After clone this project you must generate release-key.keystore

```
keytool -genkeypair -v -storetype PKCS12 -keystore release-key.keystore -alias purple-key -keyalg RSA -keysize 2048 -validity 10000
```

2 . After generate keystore you must create file .env

the password is when you generate `keytool`

```
PURPLE_STORE_PASSWORD=******
PURPLE_KEY_PASSWORD=******
```

3 . Install Dependencies

```
npm Install
```

4 . Start develop

after you open the emulator then

```
npm run android
```

## How build APK

Open folder android and type `gradlew clean && gradlew assembleRelease`

## Where is the APK file

APK file is in folder `android/app/build/outputs/apk`

The folder will contain separated APK

```
app-arm64-v8a-release.apk
app-armeabi-v7a-release.apk
app-x86_64-release.apk
app-x86-release.apk
```

you can use by your device spec
