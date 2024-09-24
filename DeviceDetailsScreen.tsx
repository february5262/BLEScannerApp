import React, { useState, useEffect, useLayoutEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';
import WifiManager from 'react-native-wifi-reborn';
import Toast from 'react-native-toast-message';

const DeviceDetailsScreen = () => {
  const route = useRoute();
  const { deviceId, deviceName, deviceRSSI } = route.params as { deviceId: string; deviceName: string; deviceRSSI: number };
  const [wifiSSID, setWifiSSID] = useState<string | null>(null);

  // Wi-Fi SSID 가져오는 함수
  const getWifiSSID = async () => {
    try {
        const ssid = await WifiManager.getCurrentWifiSSID();
        console.log("SSID: " + ssid);
        setWifiSSID(ssid);
    } catch (error) {
      console.log('Error fetching SSID:', error);
    }
  };

  // 기기에 SSID를 쓰는 함수
  const writeToDevice = () => {
    if (wifiSSID) {
      console.log(`Writing SSID ${wifiSSID} to device ${deviceName}`);
      Toast.show({
        type: 'success',
        text1: '전송 성공',
        text2: `SSID ${wifiSSID}가 ${deviceName}에 전송되었습니다.`,
      });
    } else {
      Toast.show({
        type: 'error',
        text1: '와이파이 오류',
        text2: '와이파이가 연결되지 않았습니다.',
      });
    }
  };

  useLayoutEffect(() => {
    getWifiSSID();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Device Details</Text>
      <Text style={styles.info}>Name: {deviceName}</Text>
      <Text style={styles.info}>UUID: {deviceId}</Text>
      <Text style={styles.info}>RSSI: {deviceRSSI}</Text>
      <Button title="WRITE" onPress={writeToDevice} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  info: {
    fontSize: 18,
    marginBottom: 5,
  },
});

export default DeviceDetailsScreen;
