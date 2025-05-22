import React, { useEffect, useState,useCallback } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Animated, ScrollView, Alert, Pressable,RefreshControl } from "react-native";
import { CheckCircle, Dot, MyAccountActive, Tele, Vector } from "../../asset/img";
// import { Ionicons } from "@expo/vector-icons";
import { useIsFocused, useNavigation } from '@react-navigation/native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getUnAuthReqest } from "../Service/APIServices/axoisService";

const stepsDatas = [
  {
    title: "Site & Agreement Visit",
    subTasks: [
      { name: "Site Visit", status: "Pending" },
      { name: "Agreement Visit", status: "Pending" },
    ],
    completed: true,
  },
  {
    title: "Subsidy & Financing",
    subTasks: [{ name: "Financial Review", status: "Pending" }],
    estimatedDate: "12-03-2025",
  },
  {
    title: "Payment & Planning",
    subTasks: [{ name: "Plan Finalization", status: "Pending" }],
    estimatedDate: "12-03-2025",
  },
  {
    title: "System Delivery & Installation",
    subTasks: [{ name: "Component Delivery", status: "Pending" }],
    estimatedDate: "12-03-2025",
  },
  {
    title: "System Inspection & Approvals",
    subTasks: [{ name: "Inspection Schedule", status: "Pending" }],
    estimatedDate: "12-03-2025",
  },
  {
    title: "Final Testing & Handover",
    subTasks: [{ name: "Final Testing", status: "Pending" }],
    estimatedDate: "12-03-2025",
  },
];

const RsolarHome = () => {
  const isFocused = useIsFocused();
  const navigation = useNavigation<any>()
  const [expandedStep, setExpandedStep] = useState<number | null>(null);
  const [stepsData, setStepsData] = useState<any>(stepsDatas);
  const [deliveryData, setDeliveryData] = useState<any>([]);
  const [showDate, setShowDate] = useState<any>(false);
  const [visibleItems, setVisibleItems] = useState<boolean[]>(stepsDatas.map(() => false));
  const [refreshing, setRefreshing] = useState(false);
  const [isPaymentCompleteLater, setIsPaymentCompleteLater] = useState(false);

  const [userInfo, setUserInfo] = useState<any>({})
  useEffect(() => {
    getUserInfo();
  }, [isFocused])

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      getUserInfo();
    }, 1500); // Simulate API call or data fetch
  }, []);

  const getUserInfo = async () => {
    const getInfo: any = await AsyncStorage.getItem('solar_customer_data');
    // console.log('sachin', getInfo)
    setUserInfo(JSON.parse(getInfo))

    getHomeData(JSON.parse(getInfo))
  }

  const getHomeData = (customerData: any) => {
    getUnAuthReqest(`/rsolar/solar-home?customerid=${customerData.customerid}`)
      .then((res: any) => {
        // console.log('my profile ', res.data.data.deliveryData);
        console.log('my profile ', JSON.stringify(res.data.data));
        // console.log('my profile ', res.data.data);
        setStepsData(res.data.data.salesData)
        if(res.data.data.partialAmountComplete){
          setIsPaymentCompleteLater(true)
        }
        setDeliveryData(res?.data?.data?.deliveryData[0])
        if (res.data.data.salesData[0].completed == true) {
          setShowDate(true)
        }
      })
      .catch(err => {
        console.log('user info from profile', err);
      });
  }

  const toggleStep = (index: number) => {
    const updatedVisibility = [...visibleItems];
    updatedVisibility[index] = !updatedVisibility[index];
    setVisibleItems(updatedVisibility);

  };

  return (
    <ScrollView style={styles.container}
    refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    >
      <View style={{ flexDirection: 'row', gap: 35 }}>
        <View style={{ flex: 1 }}>
          <Text style={[styles.header, { color: '#242734' }]}>Hi, {userInfo.fullname}</Text>
          <Text style={[styles.subHeader, { color: 'rgba(36, 39, 52, 0.50)' }]}>1,000+ people have joined the R-Solar mission.</Text>
          <Text style={[styles.sectionTitle, { color: '#242734' }]}>Your R-Solar Updates</Text>
        </View>
        <View>
          <TouchableOpacity onPress={() => navigation.navigate('MoreContent')}>
            <MyAccountActive />

          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.stepsContainer}>
        {stepsData.map((step: any, index: any) => {
          const isExpanded = expandedStep === index;

          return (
            <View key={index} style={styles.stepWrapper}>
              {/* Vertical Progress Line */}
              {/* {index !== 0 && ( */}
              <View style={[styles.progressLine, step.subTasks.length > 0 ? styles.activeLine : {}]} />
              {/* )} */}
              {/* <View style={[ styles.activeLine]} /> */}


              {/* Step Indicator (Big Circle) */}
              <View>
                {step.subTasks.length > 0 ? <CheckCircle style={{ zIndex: 1, marginTop: 14, marginRight: 10 }} /> : <View style={[styles.stepIndicator, { marginTop: 15 }]}>
                </View>}

              </View>
              {/* Step Content */}
              <View style={styles.stepContent}>
              {step.subTasks.length > 0 ?
                <TouchableOpacity
                  style={[styles.stepBox]}
                  onPress={() => toggleStep(index)}
                >
                  {/* <Text style={[styles.stepTitle]}>{step.title}</Text> */}
                  {step.title=='Payment & Planing' ? <Text style={[styles.stepTitle]}>Payment & Planning</Text> : <Text style={[styles.stepTitle]}>{step.title}</Text>}
                </TouchableOpacity>:<View
                  style={[styles.stepBox]}
                >
                  {step.title=='Payment & Planing' ? <Text style={[styles.stepTitle,{color:'#888'}]}>Payment & Planning</Text> : <Text style={[styles.stepTitle,{color:'#888'}]}>{step.title}</Text>}
                  {/* <Text style={[styles.stepTitle,{color:'#888'}]}>{step.title}</Text> */}
                  
                </View>}

                {/* Animated Expanding Subtasks */}
                {visibleItems[index] && (
                  <View
                    style={[

                    ]}
                  >
                    {step.subTasks?.map((task: any, idx: any) => (

                      <View>

                        {task.name == 'Initial Site Visit' || task.name == 'Contract Signing' || task.name == 'Installation Planning Visit' || task.name == 'Hardware Delivery' || task.name == 'System Installation' || task.name == 'Civil Work' || task.name == 'System Inspection' || task.name == 'MPEB Connection' || task.name == 'System Handover' ?
                          <View style={[styles.internalStep, { flexDirection: 'column', marginTop: 8, gap: 20 }]}>


                            {/* dot progress bar */}
                           
                            {/* status assign with delivery data */}
                            <View style={{ flexDirection: 'row',width:'100%',justifyContent:'space-between' }}>
                            <View style={[{ position: 'absolute', right: '115%', top: '6%' }]}>
                              {step.completed ? <Dot /> : null}
                            </View>
                              <View style={{ flexDirection: 'column',maxWidth:'40%' }}>
                                <Text style={{ color: '#242734', fontFamily: 'Avenir Medium', fontSize: 14, fontWeight: '500' }}>{task.name}</Text>
                              </View>


                              <View style={[task.status == 'Completed' ? styles.completeStausView : (task.status == 'Scheduled' || task.status == 'Re-Scheduled') ? styles.scheduleStausView : styles.pendingStausView, { flexDirection: 'column',maxHeight:30 }]}>
                                <Text style={[{ color: '#242734', fontFamily: 'Avenir Medium', fontSize: 14, fontWeight: '500' }, task.status == 'Completed' ? styles.completeStaus : (task.status == 'Scheduled' || task.status == 'Re-Scheduled') ? styles.scheduleStaus : styles.pendingStatus]}>{task.status}</Text>

                              </View>


                            </View>
                            {task.getDelData && task.getDelData.length > 0 ?
                              <>
                                <View style={{ borderWidth: 1, borderColor: '#F3F5F7', width: '100%' }}></View>

                                <View style={{ flexDirection: 'row', gap: 30,width:'100%' }}>
                                  <View >
                                    <Text style={[{ color: '#000' }, styles.greyText]}>Visit Date</Text>
                                    <Text style={{ color: '#242734', fontSize: 12, fontFamily: 'Avenir Medium', fontWeight: '500' }}>{task.visitdate}
                                    </Text>

                                  </View>
                                  <View >
                                    <Text style={[{ color: '#000' }, styles.greyText]}>Visit Time</Text>
                                    <Text style={{ color: '#242734', fontSize: 12, fontFamily: 'Avenir Medium', fontWeight: '500' }}>{task.visitTime}</Text>

                                  </View>

                                </View>


                                <View style={{ flexDirection: 'row',width:'100%' }}>
                                  <View >
                                    <Text style={[{}, styles.greyText]}>Site Address</Text>
                                    <Text style={{ color: '#242734', fontSize: 12, fontFamily: 'Avenir Medium', fontWeight: '500' }}>{userInfo.address}, {userInfo.village_name}, {userInfo.district_name}, {userInfo.tehsil_name}, {userInfo.state_name}, {userInfo.pincode}</Text>

                                  </View>
                                </View>

                                {task.getDelData && task.getDelData.length > 0 ?
                                  <View style={{ flexDirection: 'row', borderRadius: 8, borderColor: '#F3F5F7', borderStyle: 'solid', borderWidth: 1, padding: 16, maxWidth: '100%' }}>
                                    <View style={{ flexDirection: 'row' }}>
                                      <View style={{ width: 32, height: 32, alignItems: 'center', borderStyle: 'solid', borderWidth: 1, borderColor: '#F3F5F7', justifyContent: 'center', backgroundColor: '#fff', borderRadius: 100, marginRight: 10, marginLeft: -10, flexDirection: 'row' }}>
                                        <Vector />
                                      </View>

                                      <View style={{ flexDirection: 'column', width: '50%' }}>
                                        <Text style={{ color: '#242734', fontWeight: '800', fontFamily: 'Avenir Medium' }}>{task.getDelData[0].firstname} {task.getDelData[0].lastname}</Text>
                                        {/* <Text style={{ color: 'rgba(36, 39, 52, 0.50)', fontSize: 8, fontWeight: '500', fontFamily: 'Avenir Medium' }}>R-solar sales</Text> */}
                                      </View>


                                    </View>

                                    <Pressable onPress={() => navigation.navigate('CallPopUp', { mobile: task.getDelData[0].mobile })} style={{ padding: 5, flexDirection: 'row', backgroundColor: '#000', gap: 8, justifyContent: 'center', alignItems: 'center', paddingLeft: 16, paddingRight: 16, borderRadius: 50, marginRight: '5%',maxHeight:40 }}>
                                      <Tele />
                                      <Text style={{ color: '#fff' }}>Call</Text>
                                    </Pressable>

                                  </View> : null}
                              </> : null}

                            {task.status == 'Completed' ?
                              <>
                                <View style={{ borderWidth: 1, borderColor: '#F3F5F7', width: '100%' }}></View>
                                <View style={{ right: 80 }}>
                                  <Text style={[{ color: '#000' }, styles.greyText]}>Completed Date</Text>
                                  <Text style={{ color: '#242734', fontSize: 12, fontFamily: 'Avenir Medium', fontWeight: '500' }}>{task.completionDate}
                                  </Text>

                                </View>
                              </> : null}

                          </View>


                          :

                          <View style={[styles.internalStep, { flexDirection: 'column', marginTop: 8, }]}>
                            
                            <View style={{ flexDirection: 'row',width:'100%',justifyContent:'space-between' }}>
                              {/* dot progress bar */}
                              <View style={[{ position: 'absolute', right: '115%',top:'10%' }]}>
                              {step.completed ? <Dot /> : null}
                            </View>

                              <View style={{ flexDirection: 'column', padding: 5,maxWidth:'50%'}}>
                                <Text style={{ color: '#000' }}>{task.name}</Text>
                              </View>


                              <View style={[(task.status == 'Completed' || task.status == 'Not Required (Cash pay)' || isPaymentCompleteLater==true) ? styles.completeStausView : (task.status == 'Scheduled' || task.status == 'Re-Scheduled') ? styles.scheduleStausView : styles.pendingStausView, { flexDirection: 'column',maxHeight:30 }]}>

                                {task.status != 'Not Required (Cash pay)' ? (task.status=='Partial Amount Received' && isPaymentCompleteLater==true) ?
                                  <Text style={[{ color: '#242734', fontFamily: 'Avenir Medium', fontSize: 14, fontWeight: '500' }, styles.completeStaus]}>Completed</Text>
                                  :
                                  <Text style={[{ color: '#242734', fontFamily: 'Avenir Medium', fontSize: 14, fontWeight: '500' }, (task.status == 'Completed' || task.status == 'Not Required (Cash pay)') ? styles.completeStaus : (task.status == 'Scheduled' || task.status == 'Re-Scheduled') ? styles.scheduleStaus : styles.pendingStatus,]}>{task.status}</Text>
                                  :
                                  <Text style={[{ color: '#242734', fontFamily: 'Avenir Medium', fontSize: 14, fontWeight: '500' }, (task.status == 'Completed' || task.status == 'Not Required (Cash pay)') ? styles.completeStaus : (task.status == 'Schedule' || task.status == 'Re-Scheduled') ? styles.scheduleStaus : styles.pendingStatus,]}>Cash Payment</Text>}


                              </View>
                            </View>

                            {task.status == 'Completed' ?
                              <View style={{ width: '100%', marginTop: 20 }}>
                                <View style={{ borderWidth: 1, borderColor: '#F3F5F7', width: '100%' }}></View>
                                <View >
                                  <Text style={[{ color: '#000', marginTop: 10 }, styles.greyText]}>Completed Date</Text>
                                  <Text style={{ color: '#242734', fontSize: 12, fontFamily: 'Avenir Medium', fontWeight: '500' }}>{task.completionDate}
                                  </Text>

                                </View>
                              </View> : null}

                          </View>
                        }



                      </View>


                    ))}
                  </View>)}

                {/* Estimated Completion Date (Always Visible) */}
                {step.completed == false && step.estimatedDate ?
                  <Text style={styles.estimatedDate}>Estimated completion date: {step.estimatedDate}</Text> : null
                }
              </View>
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  completeStaus: {
    color: '#73BE44'
  },
  completeStausView: {
    borderRadius: 50,
    borderWidth: 0.5,
    borderStyle: 'solid',
    backgroundColor: 'rgba(115, 190, 68, 0.10)',
    borderColor: 'rgba(115, 190, 68, 0.50)',
    paddingLeft: 8,
    paddingRight: 8,
    paddingTop: 4,
    paddingBottom: 4,
    height: 30,
    left: 10
  },

  //Schedule
  scheduleStaus: {
    color: '#FF9829'
  },
  scheduleStausView: {
    borderRadius: 50,
    borderWidth: 0.5,
    borderStyle: 'solid',
    backgroundColor: 'rgba(255, 152, 41, 0.10)',
    borderColor: 'rgba(255, 152, 41, 0.50)',
    paddingLeft: 8,
    paddingRight: 8,
    paddingTop: 4,
    paddingBottom: 4
  },

  //panding
  pendingStaus: {
    color: '#DC2626'
  },
  pendingStausView: {
    borderRadius: 50,
    borderWidth: 0.5,
    borderStyle: 'solid',
    backgroundColor: 'rgba(220, 38, 38, 0.10)',
    borderColor: 'rgba(220, 38, 38, 0.50)',
    paddingLeft: 8,
    paddingRight: 8,
    paddingTop: 4,
    paddingBottom: 4
  },
  greyText: {
    color: 'rgba(36, 39, 52, 0.50)',
    fontFamily: 'Avenir Medium',
    fontSize: 12,
    fontWeight: '400',
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#F8F9FA",
  },
  header: {
    fontSize: 24,
    fontWeight: "800",
    color: "#222",
    fontFamily: 'Avenir Medium'
  },
  subHeader: {
    fontSize: 12,
    color: "#rgba(36, 39, 52, 0.50)",
    marginBottom: 20,
    fontWeight: '400',
    fontFamily: 'Avenir Medium'
  },
  stepsContainer: {
    marginTop: 10,
    marginBottom: 40,
  },
  stepWrapper: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 10,
  },
  progressLine: {
    width: 2,
    height: '100%',
    backgroundColor: "#ccc",
    position: "absolute",
    left: 15,
    top: 24,
  },
  activeLine: {
    backgroundColor: "#73BE44",
    width: 2,
    height: '100%',
    position: "absolute",
    left: 15,
    top: 35,
  },
  stepIndicator: {
    width: 26,
    height: 26,
    borderRadius: 15,
    backgroundColor: "#ccc",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
    left: 3
  },
  completedIndicator: {
    backgroundColor: "#73BE44",
  },
  stepContent: {
    flex: 1,
  },
  stepBox: {
    backgroundColor: "#FFF",
    padding: 18,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },

  internalStep: {
    backgroundColor: "#FFF",
    padding: 18,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  completedStep: {
    borderLeftWidth: 6,
    borderLeftColor: "green",
  },
  stepTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: "#333",
    fontFamily: 'Avenir Medium'
  },
  estimatedDate: {
    fontSize: 12,
    color: "#888",
    marginLeft: 10,
    marginTop: 5,
  },
  subTasksContainer: {
    overflow: "hidden",
  },
  subTaskWrapper: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 4,
  },
  subTaskIndicator: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: "#ccc",
    marginRight: 10,
  },
  completedSubTask: {
    backgroundColor: "green",
  },
  subTaskText: {
    fontSize: 14,
    color: "#444",
    flex: 1,
  },
  pendingStatus: {
    fontSize: 14,
    color: "red",
  },
  completedStatus: {
    fontSize: 14,
    color: "green",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "400",
    marginBottom: 10
  },
});

export default RsolarHome;


