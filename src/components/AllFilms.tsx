import React, { useEffect, useState, useRef } from 'react'
import { View, Text, FlatList, ImageBackground, Image, StyleSheet, Animated } from 'react-native';
import Loader from './Loader';
import { starWar, overFlowImage } from '../assest/images';
import Pinchable from 'react-native-pinchable';
import useAllFilms from '../graphql/useAllFilms';


interface renderItem {
    item: {
        title: string,
        director: string,
        releaseDate: string,
        id: string
    },
    index: number
}

const TILE_SIZE = 325;
const AllFilms = (props: any) => {
    const { error, loading, data } = useAllFilms();
    // const { error, loading, data } = useQuery(ALL_FILMS);
    const [filmData, setFilmData] = useState([]);
    const scaleY = useRef(new Animated.Value(0)).current;
    useEffect(() => {
        if (data) {
            //console.log("All films data", data.allFilms.films);
            const films = data?.allFilms?.films || []
            setFilmData(films);
        }
    }, [data]);

    const renderFilmItem = ({ item, index }: renderItem) => {
        const scale = scaleY.interpolate({
            inputRange: [-1, 0, TILE_SIZE * index, TILE_SIZE * (index + 1)],
            outputRange: [1, 1, 1, 0]
        });
        const opacity = scaleY.interpolate({
            inputRange: [-1, 0, TILE_SIZE * index, TILE_SIZE * (index+1)],
            outputRange: [1, 1, 1, 0]
        });
        return (
            <Animated.View key={index} style={[styles.filmTile, { transform: [{ scale }],opacity }]}>
                <View style={{ flex: 1 }}>
                    <Pinchable>
                        <Image source={starWar} resizeMode='stretch' style={styles.imageStyle} />
                    </Pinchable>
                    <View style={styles.mainTextView}>
                        <View style={styles.filmTextView}>
                            <Text style={styles.filmText}>Title : </Text>
                            <Text style={styles.filmText}>{item.title}</Text>
                        </View>
                        <View style={styles.filmTextView}>
                            <Text style={styles.filmText}>Director : </Text>
                            <Text style={styles.filmText}>{item.director}</Text>
                        </View>
                        <View style={styles.filmTextView}>
                            <Text style={styles.filmText}>Released Date : </Text>
                            <Text style={styles.filmText}>{item.releaseDate}</Text>
                        </View>
                    </View>
                </View>
            </Animated.View>
        )
    }

    return (
        <View style={{ flex: 1, height: '100%', display: 'flex', backgroundColor: 'black' }}>
            <View style={styles.screentitleView}>
                <Text style={styles.screenTitle}>Movies</Text>
            </View>
            <Animated.FlatList
                scrollEnabled={true}
                contentContainerStyle={{ display: 'flex',paddingTop:10, paddingBottom: 100,alignItems:'center' }}
                data={filmData}
                renderItem={renderFilmItem}
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={false}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: scaleY } } }],
                    { useNativeDriver: true }
                )}
            />
            {loading && <Loader />}
        </View>
    )
}

const styles = StyleSheet.create({
    filmText: { color: 'white', fontWeight: 'bold', fontSize: 16 },
    filmTextView: { display: 'flex', flexDirection: 'row' },
    mainTextView: { padding: 10, flex: 1, display: 'flex', position: 'absolute', backgroundColor: 'rgba(0,0,0,0.3)', alignSelf: 'baseline', top: '70%', height: '30%', width: '100%', borderBottomLeftRadius: 10, borderBottomRightRadius: 10 },
    filmTile: {
        width: 310, marginBottom: 20, height: 320, backgroundColor: 'white', borderRadius: 10,
    },
    imageStyle: { height: '100%', width: '100%', overflow: 'hidden', borderTopLeftRadius: 10, borderBottomLeftRadius: 10, borderBottomRightRadius: 10, borderTopRightRadius: 10, },
    screentitleView:{height:'5%',alignItems:'center',display:'flex',justifyContent:'center',backgroundColor:'black'},
    screenTitle:{color:'white',fontSize:20,fontWeight:'bold'}
});

export default AllFilms;
