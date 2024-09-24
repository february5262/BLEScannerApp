# BLE 스캐너 앱

이 프로젝트는 Bluetooth Low Energy (BLE) 기기를 스캔하고, 연결된 Wi-Fi의 SSID를 특정 BLE 기기에 전송하는 기능을 가진 모바일 애플리케이션입니다. 이 앱은 React Native를 사용하여 개발되었습니다.

## 기능

- 주변 BLE 기기를 스캔하여 목록에 표시
- 선택한 BLE 기기의 상세 정보 표시
- 현재 연결된 Wi-Fi의 SSID 가져오기
- SSID를 선택한 BLE 기기에 전송

## 기술 스택

- **React Native**: 모바일 애플리케이션 개발을 위한 프레임워크
- **react-native-ble-plx**: BLE 기기와의 상호작용을 위한 라이브러리
- **react-native-wifi-reborn**: Wi-Fi 상태와 정보를 가져오는 라이브러리
- **react-navigation**: 화면 간의 내비게이션을 관리하는 라이브러리
- **react-native-toast-message**: 사용자에게 메시지를 표시하는 토스트 라이브러리


## 필수 조건

프로젝트를 빌드하고 실행하기 전에 다음이 설치되어 있는지 확인한다:

- [Node.js](https://nodejs.org/) (버전 18 이상)
- [React Native CLI](https://reactnative.dev/docs/environment-setup)
- [Android Studio](https://developer.android.com/studio) (Android SDK 포함)

## 설치 및 빌드 프로세스

다음 단계를 따라 프로젝트를 설치하고 빌드한다:

1. **프로젝트 클론**:
   ```bash
   git clone https://github.com/february5262/BLEScannerApp.git
   cd BLEScannerApp
2. **의존성 설치**:
   ```bash
   npm install
   cd ios
   pod install
3. **앱 실행**:
   ```bash
   npx react-native run-android
   npx react-native run-ios
## 사용법
1. 앱을 실행한 후, BLE 스캐너가 주변 기기를 자동으로 검색합니다.
2. 목록에서 원하는 기기를 선택하면 해당 기기의 상세 정보를 볼 수 있습니다.
3. "WRITE" 버튼을 클릭하면 현재 연결된 Wi-Fi의 SSID가 선택한 기기에 전송됩니다.

## License

This project is licensed under the MIT License
