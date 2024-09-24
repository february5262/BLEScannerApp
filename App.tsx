import React, { useState, useEffect } from 'react';
import { SafeAreaView, FlatList, Text, TouchableOpacity, StyleSheet, PermissionsAndroid, Platform } from 'react-native';
import { BleManager, Device } from 'react-native-ble-plx';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import Toast from 'react-native-toast-message';
import DeviceDetailsScreen from './DeviceDetailsScreen';
import { requestBluetoothPermissions } from './utils/PermissionHandler';

const Stack = createStackNavigator();

type RootStackParamList = {
  DeviceList: undefined;
  DeviceDetails: { deviceId: string; deviceName: string|null; deviceRSSI: number|null };
};

type DeviceListScreenNavigationProp = StackNavigationProp<RootStackParamList, 'DeviceList'>;

interface DeviceListScreenProps {
  navigation: DeviceListScreenNavigationProp;
}

const DeviceListScreen: React.FC<DeviceListScreenProps> = ({ navigation }) => {
  const [devices, setDevices] = useState<Map<string, Device>>(new Map());
  const [manager] = useState(new BleManager());

  useEffect(() => {
    const subscription = manager.onStateChange((state) => {
      if (state === 'PoweredOn') {
        checkPermissions();  // 권한 확인 후 스캔
      } else {
        console.log('Bluetooth 상태:', state);
      }
    }, true);

    return () => {
      subscription.remove();
      manager.destroy();
    };
  }, [manager]);

  const checkPermissions = async () => {
    const granted = await requestBluetoothPermissions();
    if (granted) {
      scanForDevices();
    } else {
      console.log("Bluetooth permissions not granted");
    }
  };

  const scanForDevices = () => {
    manager.startDeviceScan(null, null, (error, device) => {
      if (error) {
        console.log("scanning error:",error);
        return;
      }
      if (device && device.name && !devices.has(device.id)) {
        setDevices((prevDevices) => new Map(prevDevices.set(device.id, device)));
      }
    });

    setTimeout(() => {
      manager.stopDeviceScan();
    }, 10000); // 10초 후 스캔 중지
  };

  const renderItem = ({ item }: { item: Device }) => (
    <TouchableOpacity
      style={styles.deviceItem}
      onPress={() => navigation.navigate('DeviceDetails', { 
        deviceId: item.id, 
        deviceName: item.name, 
        deviceRSSI: item.rssi 
      })}>
      <Text style={styles.deviceName}>{item.name}</Text>
      <Text style={styles.deviceUUID}>UUID: {item.id}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={Array.from(devices.values())}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="DeviceList" component={DeviceListScreen} options={{ title: 'Devices' }} />
        <Stack.Screen name="DeviceDetails" component={DeviceDetailsScreen} options={{ title: 'Device Details' }} />
      </Stack.Navigator>
      <Toast />
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 10,
  },
  deviceItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  deviceName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  deviceUUID: {
    fontSize: 14,
    color: '#888',
  },
});

export default App;
