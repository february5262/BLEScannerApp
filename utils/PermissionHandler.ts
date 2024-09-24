// PermissionHandler.ts
import { PermissionsAndroid, Platform } from 'react-native';

export const requestBluetoothPermissions = async (): Promise<boolean> => {
  if (Platform.OS !== 'android') {
    return true; // Android가 아닌 경우 권한 필요 없음
  }

  try {
    const grantedScan = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
      {
        title: '블루투스 스캔 권한',
        message: '이 앱은 블루투스 기기를 스캔하기 위해 권한이 필요합니다.',
        buttonNeutral: '나중에 묻기',
        buttonNegative: '취소',
        buttonPositive: '확인',
      }
    );

    const grantedConnect = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
      {
        title: '블루투스 연결 권한',
        message: '이 앱은 블루투스 기기에 연결하기 위해 권한이 필요합니다.',
        buttonNeutral: '나중에 묻기',
        buttonNegative: '취소',
        buttonPositive: '확인',
      }
    );

    const grantedLocation = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: '위치 권한',
        message: '이 앱은 블루투스 기기를 스캔하기 위해 위치 접근 권한이 필요합니다.',
        buttonNeutral: '나중에 묻기',
        buttonNegative: '취소',
        buttonPositive: '확인',
      }
    );

    return (
      grantedScan === PermissionsAndroid.RESULTS.GRANTED &&
      grantedConnect === PermissionsAndroid.RESULTS.GRANTED &&
      grantedLocation === PermissionsAndroid.RESULTS.GRANTED
    );
  } catch (err) {
    console.warn(err);
    return false;
  }
};

