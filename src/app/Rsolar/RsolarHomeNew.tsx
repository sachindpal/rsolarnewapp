import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { CheckCircle } from '../../asset/img';
// import Icon from 'react-native-vector-icons/Ionicons';

const RsolarHome = () => {
  const [isAgreementVisitOpen, setAgreementVisitOpen] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.greeting}>Hi, Anil Kumar</Text>
      <Text style={styles.subGreeting}>1,000+ people have joined the R-Solar mission.</Text>

      <View style={styles.section}>
        <View style={styles.timeline}>
          <View style={styles.circle} />
          <View style={styles.line} />
        </View>

        <Text style={styles.title}>Site & Agreement Visit</Text>
        
        <View style={styles.visitDetails}>
          <Text style={styles.visitStatus}>
            Site Visit: <Text style={styles.statusScheduled}>Scheduled</Text>
          </Text>
          <Text>Visit date: 14-02-2025</Text>
          <Text>Visit time: 10:00 AM</Text>
          <Text>Site address: 23, Jawhar Road, Badgaon, Thikari, Badwani, Madhya Pradesh, 451447</Text>
          <Text style={styles.retailer}>Sunil Kumar</Text>
          <TouchableOpacity style={styles.callButton} onPress={() => console.log('Call pressed')}>
            <Text style={styles.callButtonText}>Call</Text>
            <CheckCircle />
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={() => setAgreementVisitOpen(!isAgreementVisitOpen)}>
          <Text style={styles.agreementTitle}>Agreement Visit</Text>
        </TouchableOpacity>
        {isAgreementVisitOpen && (
          <Text style={styles.agreementStatus}>Pending</Text>
        )}
      </View>

      <View style={styles.section}>
        <Text style={styles.title}>Subsidy & Financing</Text>
        <Text>Expected resolution date: 12-03-2025</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  subGreeting: {
    fontSize: 14,
    color: '#777',
    marginBottom: 20,
  },
  section: {
    marginBottom: 20,
    padding: 15,
    borderRadius: 8,
    backgroundColor: '#fff',
    elevation: 2,
  },
  timeline: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
  },
  circle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    backgroundColor: 'green',
  },
  line: {
    flex: 1,
    height: 2,
    backgroundColor: '#ccc',
    marginLeft: 10,
    marginRight: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  visitDetails: {
    marginTop: 10,
  },
  visitStatus: {
    fontSize: 16,
  },
  statusScheduled: {
    fontWeight: 'bold',
    color: 'green',
  },
  retailer: {
    marginTop: 10,
    fontWeight: 'bold',
  },
  callButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  callButtonText: {
    color: '#fff',
    marginRight: 5,
  },
  agreementTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 15,
  },
  agreementStatus: {
    fontSize: 16,
    color: 'orange',
  },
});

export default RsolarHome;