import { StyleSheet, Text, View } from 'react-native'
import { BottomNavigation, Card, Button, MD3Colors, Appbar, FAB } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import React, { useEffect, useState } from 'react'
import { FlatList, RefreshControl, ScrollView } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { format, isSameDay, parse } from 'date-fns';

import { useBookShiftMutation, useCancelShiftMutation, useGetShiftsQuery } from '../redux/shiftsApi';
const Tab = createMaterialTopTabNavigator()

const MyShiftsRoute = () => {
    const { data, isLoading, isError, error } = useGetShiftsQuery()
    const [filtered, setFiltered] = useState([])
    const [cancelShift] = useCancelShiftMutation()



    useEffect(() => {
        const fiterdShifts = data && data.filter(item => item.booked !== true)
        if (fiterdShifts) {
            const x = fiterdShifts.map(item => {
                return { ...item, date: format(item.startTime, "dd-MM-yyyy"), start: format(item.startTime, "hh:mm"), end: format(item.endTime, "hh:mm") }
            })
            // console.log(x);
            const record = x.reduce((result, item) => {
                const i = result.findIndex(x => x[0].date === item.date)
                if (i === -1) {
                    // console.log("yes");
                    result.push([item])
                } else {
                    result[i].push(item)
                    // console.log("no");
                }
                return result
            }, [])
            setFiltered(record)
            // setFiltered(data && data.map(item => {
            //     return { ...item, date: format(item.startTime, "dd-MM-yyyy"), start: format(item.startTime, "hh:mm:ss"), end: format(item.endTime, "hh:mm:ss") }
            // }))

        }
    }, [data])


    return <>
        <Appbar>


        </Appbar >

        <ScrollView>

            <View style={{ marginTop: 0 }}>

                {
                    filtered && filtered.map((item, index) => <View style={{}}>
                        <Text style={{ marginVertical: 2, fontSize: 18, paddingVertical: 10, paddingHorizontal: 10, backgroundColor: "#F1F4F8", color: "#004FB4", fontWeight: "bold" }}>{isSameDay(parse(item[0].date, 'dd-MM-yyyy', new Date()), new Date) ? "Today" : format(parse(item[0].date, 'dd-MM-yyyy', new Date()), 'MMMM dd')}</Text>
                        {
                            item.map(r => <Card style={{
                                paddingHorizontal: 10,
                                borderBlockColor: "red",
                                paddingVertical: 2,
                                borderWidth: 0.2, // Add border width
                                borderColor: "gray", // Add border color
                                padding: 1,
                                borderRadius: 0


                            }}>
                                <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                                    <Text style={{ marginVertical: 2, fontSize: 18, color: "#4F6C92" }}>{r.start}: {r.end}</Text>
                                    <Text style={{ marginHorizontal: 0 }}></Text>
                                    <Button onPress={() => cancelShift(r)} mode='outlined' style={{ borderColor: '#16A64D', borderBottomColor: '#16A64D', marginVertical: 4 }}>{`${!r.booked ? "Cancel" : "Book"}`}</Button>
                                </View>
                            </Card>)
                        }
                    </View>)
                }
            </View>
        </ScrollView >




    </>

}
const Helsinki = () => {
    const { data } = useGetShiftsQuery()
    const [bookShift, { isLoading, isSuccess, isError, error }] = useBookShiftMutation()
    const [filtered, setFiltered] = useState([])
    if (isSuccess) {
        console.warn("success");
    }

    useEffect(() => {
        const fiterdShifts = data && data.filter(item => item.area === "Helsinki")
        if (fiterdShifts) {
            const x = fiterdShifts.map(item => {
                return { ...item, date: format(item.startTime, "dd-MM-yyyy"), start: format(item.startTime, "hh:mm"), end: format(item.endTime, "hh:mm") }
            })
            // console.log(x);
            const record = x.reduce((result, item) => {
                const i = result.findIndex(x => x[0].date === item.date)
                if (i === -1) {
                    // console.log("yes");
                    result.push([item])
                } else {
                    result[i].push(item)
                    // console.log("no");
                }
                return result
            }, [])
            setFiltered(record)


        }
    }, [data])
    // console.log(filtered);

    return <>
        <ScrollView>

            <View style={{ marginTop: 10 }}>

                {
                    filtered && filtered.map((item, index) => <View style={{}}>
                        {/* <Text style={{ marginVertical: 2, fontSize: 18, paddingVertical: 5, backgroundColor: "#F1F4F8", color: "#004FB4", fontWeight: "bold" }}>{format(parse(item[0].date, 'dd-MM-yyyy', new Date()), 'MMMM dd')}</Text> */}
                        <Text style={{ marginVertical: 2, fontSize: 18, paddingVertical: 5, paddingHorizontal: 10, backgroundColor: "#F1F4F8", color: "#004FB4", fontWeight: "bold" }}>{isSameDay(parse(item[0].date, 'dd-MM-yyyy', new Date()), new Date) ? "Today" : format(parse(item[0].date, 'dd-MM-yyyy', new Date()), 'MMMM dd')} {item}</Text>
                        {
                            item.map(r => <Card style={{
                                paddingHorizontal: 10,
                                borderBlockColor: "red",
                                paddingVertical: 2,
                                borderWidth: 0.2, // Add border width
                                borderColor: "gray", // Add border color
                                padding: 1,
                                borderRadius: 0


                            }}>
                                <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-evenly", alignItems: "center" }}>
                                    <Text style={{ marginVertical: 2, fontSize: 18, color: "#4F6C92" }}>{r.start}: {r.end}</Text>
                                    <Text style={{ marginHorizontal: 70 }}>{r.booked ? "Booked" : ""}</Text>
                                    <Text style={{ marginHorizontal: 0 }}></Text>
                                    <Button onPress={() => bookShift(r)} mode='outlined' style={{ borderColor: '#16A64D', borderBottomColor: '#16A64D', marginVertical: 4 }}>{`${r.booked ? "Cancel" : "Book"}`}</Button>
                                </View>
                            </Card>)
                        }
                    </View>)
                }
            </View>
        </ScrollView >
    </>
}
const Tempare = () => {
    const { data } = useGetShiftsQuery()
    const fiterdShifts = data.filter(item => item.area === "Tampere")
    const [bookShift, { isLoading, isSuccess, isError, error }] = useBookShiftMutation()
    const [filtered, setFiltered] = useState([])
    useEffect(() => {
        const fiterdShifts = data && data.filter(item => item.area === "Tampere")
        if (fiterdShifts) {
            const x = fiterdShifts.map(item => {
                return { ...item, date: format(item.startTime, "dd-MM-yyyy"), start: format(item.startTime, "hh:mm"), end: format(item.endTime, "hh:mm") }
            })
            // console.log(x);
            const record = x.reduce((result, item) => {
                const i = result.findIndex(x => x[0].date === item.date)
                if (i === -1) {
                    // console.log("yes");
                    result.push([item])
                } else {
                    result[i].push(item)
                    // console.log("no");
                }
                return result
            }, [])
            setFiltered(record)
            // setFiltered(data && data.map(item => {
            //     return { ...item, date: format(item.startTime, "dd-MM-yyyy"), start: format(item.startTime, "hh:mm:ss"), end: format(item.endTime, "hh:mm:ss") }
            // }))

        }
    }, [data])
    return <>
        <ScrollView>

            <View style={{ marginTop: 10 }}>

                {
                    filtered && filtered.map((item, index) => <View style={{}}>
                        {/* <Text style={{ marginVertical: 2, fontSize: 18, paddingVertical: 5, backgroundColor: "#F1F4F8", color: "#004FB4", fontWeight: "bold" }}>{format(parse(item[0].date, 'dd-MM-yyyy', new Date()), 'MMMM dd')}</Text> */}
                        <Text style={{ marginVertical: 2, fontSize: 18, paddingVertical: 5, paddingHorizontal: 10, backgroundColor: "#F1F4F8", color: "#004FB4", fontWeight: "bold" }}>{isSameDay(parse(item[0].date, 'dd-MM-yyyy', new Date()), new Date) ? "Today" : format(parse(item[0].date, 'dd-MM-yyyy', new Date()), 'MMMM dd')}</Text>
                        {
                            item.map(r => <Card style={{
                                paddingHorizontal: 10,
                                borderBlockColor: "red",
                                paddingVertical: 2,
                                borderWidth: 0.2, // Add border width
                                borderColor: "gray", // Add border color
                                padding: 1,
                                borderRadius: 0


                            }}>
                                <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-evenly", alignItems: "center" }}>
                                    <Text style={{ marginVertical: 2, fontSize: 18, color: "#4F6C92" }}>{r.start}: {r.end}</Text>
                                    <Text style={{ marginHorizontal: 70 }}>{r.booked ? "Booked" : ""}</Text>
                                    <Text style={{ marginHorizontal: 0 }}></Text>
                                    <Button onPress={() => bookShift(r.id)} mode='outlined' style={{ borderColor: '#16A64D', borderBottomColor: '#16A64D', marginVertical: 4 }}>{`${r.booked ? "Cancel" : "Book"}`}</Button>
                                </View>
                            </Card>)
                        }
                    </View>)
                }
            </View>
        </ScrollView >
    </>
}
const Turku = () => {
    const { data } = useGetShiftsQuery()
    const fiterdShifts = data.filter(item => item.area === "Turku")
    const [bookShift, { isLoading, isSuccess, isError, error }] = useBookShiftMutation()
    const [filtered, setFiltered] = useState([])
    useEffect(() => {
        const fiterdShifts = data && data.filter(item => item.area === "Turku")
        if (fiterdShifts) {
            const x = fiterdShifts.map(item => {
                return { ...item, date: format(item.startTime, "dd-MM-yyyy"), start: format(item.startTime, "hh:mm"), end: format(item.endTime, "hh:mm") }
            })
            // console.log(x);
            const record = x.reduce((result, item) => {
                const i = result.findIndex(x => x[0].date === item.date)
                if (i === -1) {
                    // console.log("yes");
                    result.push([item])
                } else {
                    result[i].push(item)
                    // console.log("no");
                }
                return result
            }, [])
            setFiltered(record)


        }
    }, [data])
    return <>
        <ScrollView>

            <View style={{ marginTop: 10 }}>

                {
                    filtered && filtered.map((item, index) => <View key={item.id} style={{}}>
                        {/* <Text style={{ marginVertical: 2, fontSize: 18, paddingVertical: 5, backgroundColor: "#F1F4F8", color: "#004FB4", fontWeight: "bold" }}>{format(parse(item[0].date, 'dd-MM-yyyy', new Date()), 'MMMM dd')}</Text> */}
                        <Text style={{ marginVertical: 2, fontSize: 18, paddingVertical: 5, paddingHorizontal: 10, backgroundColor: "#F1F4F8", color: "#004FB4", fontWeight: "bold" }}>{isSameDay(parse(item[0].date, 'dd-MM-yyyy', new Date()), new Date) ? "Today" : format(parse(item[0].date, 'dd-MM-yyyy', new Date()), 'MMMM dd')}</Text>
                        {
                            item.map(r => <Card style={{
                                paddingHorizontal: 10,
                                borderBlockColor: "red",
                                paddingVertical: 2,
                                borderWidth: 0.2, //Add border width
                                borderColor: "gray", //Add border color
                                padding: 1,
                                borderRadius: 0


                            }}>
                                <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-evenly", alignItems: "center" }}>
                                    <Text style={{ marginVertical: 2, fontSize: 18, color: "#4F6C92" }}>{r.start}: {r.end}</Text>
                                    <Text style={{ marginHorizontal: 70 }}>{r.booked ? "Booked" : ""}</Text>
                                    <Text style={{ marginHorizontal: 0 }}></Text>
                                    <Button onPress={() => bookShift(r.id)} mode='outlined' style={{ borderColor: '#16A64D', borderBottomColor: '#16A64D', marginVertical: 4 }}>{`${r.booked ? "Cancel" : "Book"}`}</Button>
                                </View>
                            </Card>)
                        }
                    </View>)
                }
            </View>
        </ScrollView >
    </>
}
const AvailableShiftsRoute = () => {
    const { data } = useGetShiftsQuery()
    const Helsin = data && data.filter(item => item.area === "Helsinki").length
    const Tempa = data && data.filter(item => item.area === "Tampere").length
    const Turk = data && data.filter(item => item.area === "Turku").length

    return <Tab.Navigator style={{ marginTop: 30 }}>
        <Tab.Screen name={`Helsinki (${Helsin})`} component={Helsinki} />
        <Tab.Screen name={`Tempare (${Tempa})`} component={Tempare} />
        <Tab.Screen name={`Turku (${Turk})`} component={Turku} />
    </Tab.Navigator>
}



const Home = ({ navigation }) => {
    const [index, setIndex] = useState(0)
    const [routes] = React.useState([
        { key: 'myShifts', title: 'My Shifts' },
        { key: 'availableShifts', title: 'Avalilable Shifts' },
        ,
    ]);
    const renderScene = BottomNavigation.SceneMap({
        myShifts: MyShiftsRoute,
        availableShifts: AvailableShiftsRoute,


    });
    return <>

        <SafeAreaProvider style={[styles.constianer]}>
            <BottomNavigation
                navigationState={{ index, routes }}
                onIndexChange={setIndex}
                renderScene={renderScene}
            />
        </SafeAreaProvider>
    </>
}




export default Home

const styles = StyleSheet.create({
    constianer: {
        backgroundColor: "red"
    }
})