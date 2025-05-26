import React, { useRef, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
    TextInput,
    Animated,
    TouchableWithoutFeedback,
    ScrollView,
    Image,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const IMAGE_WIDTH = SCREEN_WIDTH * 0.75;
const IMAGE_HEIGHT = SCREEN_WIDTH * 1.09;
const SPACER_WIDTH = (SCREEN_WIDTH - IMAGE_WIDTH) / 2;

export default function HomeScreen({ navigation }) {
    const [isImageExpanded, setIsImageExpanded] = useState(false);
    const scaleAnim = useRef(new Animated.Value(1)).current;
    const [selectedFilterIndex, setSelectedFilterIndex] = useState(null);
    const [activeTabIndex, setActiveTabIndex] = useState(0);
    const scrollX = useRef(new Animated.Value(0)).current;

    const tabs = [
        { name: 'Home', icon: ['home-outline', 'home'] },
        { name: 'Explore', icon: ['list-outline', 'compass'] },
        { name: 'Saved', icon: ['heart-outline', 'bookmark'] },
        { name: 'Profile', icon: ['person-outline', 'person'] },
    ];

    const handleImagePress = () => {
        setIsImageExpanded(true);
        Animated.spring(scaleAnim, {
            toValue: 1,
            useNativeDriver: true,
        }).start();
    };

    const handleCollapse = () => {
        Animated.timing(scaleAnim, {
            toValue: 1,
            duration: 200,
            useNativeDriver: true,
        }).start(() => {
            setIsImageExpanded(false);
        });
    };

    const options = ['Africa', 'Europe', 'Asia', 'South America', 'Oceania', 'North America', 'Antarctica'];
    const handleOptionPress = (index) => {
        setSelectedFilterIndex(index === selectedFilterIndex ? null : index);
    };

    const images = [
        { key: 'left-spacer' },
        { src: require('../assets/log1.jpg') },
        { src: require('../assets/log2.jpg') },
        { src: require('../assets/log3.jpg') },
        { src: require('../assets/Log.jpg') },
        { key: 'right-spacer' },
    ];

    return (
        <View style={styles.container}>
            {!isImageExpanded ? (
                <ScrollView
                    style={{ flex: 1 }}
                    contentContainerStyle={{ paddingBottom: 150 }}
                    showsVerticalScrollIndicator={false}
                >
                    <View style={styles.topContent}>
                        <View style={styles.headerContainer}>
                            <View style={styles.textContainer}>
                                <Text style={styles.greeting}>Hello, Fred</Text>
                                <Text style={styles.subGreeting}>Welcome to travel</Text>
                            </View>

                            <TouchableOpacity onPress={handleImagePress} activeOpacity={0.8}>
                                <Animated.Image
                                    source={require('../assets/man1.jpg')}
                                    style={styles.profileImage}
                                />
                            </TouchableOpacity>
                        </View>

                        <View style={styles.searchContainerWrapper}>
                            <View style={styles.searchContainer}>
                                <Ionicons name="search" size={20} color="gray" style={styles.iconLeft} />
                                <TextInput
                                    placeholder="Search"
                                    style={styles.searchInput}
                                    placeholderTextColor="gray"
                                />
                                <Ionicons name="options-outline" size={22} color="black" style={styles.iconRight} />
                            </View>

                            <Text style={styles.sectionTitle}>Select your next trip</Text>

                            <ScrollView
                                horizontal
                                showsHorizontalScrollIndicator={false}
                                contentContainerStyle={styles.scrollContentContainer}
                                style={styles.scrollViewStyle}
                            >
                                {options.map((option, index) => {
                                    const isSelected = selectedFilterIndex === index;
                                    return (
                                        <TouchableOpacity
                                            key={index}
                                            style={[styles.optionButton, isSelected && styles.optionButtonSelected]}
                                            onPress={() => handleOptionPress(index)}
                                        >
                                            <Text
                                                style={[
                                                    styles.optionButtonText,
                                                    isSelected && styles.optionButtonTextSelected,
                                                ]}
                                            >
                                                {option}
                                            </Text>
                                        </TouchableOpacity>
                                    );
                                })}
                            </ScrollView>
                        </View>
                    </View>

                    <Animated.FlatList
                        data={images}
                        keyExtractor={(item, index) => index.toString()}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        snapToInterval={IMAGE_WIDTH}
                        decelerationRate="fast"
                        bounces={false}
                        contentContainerStyle={{
                            paddingHorizontal: 0,
                            alignItems: 'center',
                        }}
                        onScroll={Animated.event(
                            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                            { useNativeDriver: true }
                        )}
                        scrollEventThrottle={16}
                        renderItem={({ item, index }) => {
                            if (!item.src) return <View style={{ width: SPACER_WIDTH }} />;
                            const inputRange = [
                                (index - 2) * IMAGE_WIDTH,
                                (index - 1) * IMAGE_WIDTH,
                                index * IMAGE_WIDTH,
                            ];
                            const scale = scrollX.interpolate({
                                inputRange,
                                outputRange: [0.9, 1, 0.9],
                                extrapolate: 'clamp',
                            });
                            const translateY = scrollX.interpolate({
                                inputRange,
                                outputRange: [20, 0, 20],
                                extrapolate: 'clamp',
                            });

                            return (
                                <Animated.View
                                    style={[
                                        styles.imageCard,
                                        { transform: [{ scale }, { translateY }] },
                                    ]}
                                >
                                    <TouchableOpacity>
                                        <Image
                                            source={item.src}
                                            style={styles.image}
                                            resizeMode="cover"
                                        />
                                    </TouchableOpacity>
                                </Animated.View>
                            );
                        }}
                    />
                </ScrollView>
            ) : (
                <TouchableWithoutFeedback onPress={handleCollapse}>
                    <View style={styles.overlay}>
                        <Animated.Image
                            source={require('../assets/man1.jpg')}
                            style={styles.expandedImage}
                        />
                    </View>
                </TouchableWithoutFeedback>
            )}

            {/* Tab Bar */}
            <View style={[styles.tabBarContainer, { width: SCREEN_WIDTH * 0.85 }]}>
                {tabs.map((tab, index) => {
                    const isActive = activeTabIndex === index;
                    const iconName = isActive ? tab.icon[1] : tab.icon[0];
                    return (
                        <TouchableOpacity
                            key={index}
                            style={styles.tabButton}
                            onPress={() => setActiveTabIndex(index)}
                            activeOpacity={0.8}
                        >
                            {isActive && <View style={styles.circleBehindIcon} />}
                            <Ionicons
                                name={iconName}
                                size={24}
                                color="#777"
                                style={{ zIndex: 2 }}
                            />
                        </TouchableOpacity>
                    );
                })}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 60,
        backgroundColor: '#f5f6f7',
    },
    topContent: {
        paddingHorizontal: SCREEN_WIDTH * 0.06,
        // removed marginBottom to avoid overlap
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        padding: 16,
        borderRadius: 10,
        zIndex: 1,
    },
    textContainer: {
        flexDirection: 'column',
    },
    greeting: {
        fontSize: 30,
        fontWeight: 'bold',
        color: 'black',
    },
    subGreeting: {
        fontSize: 14,
        color: 'gray',
        marginTop: 4,
    },
    profileImage: {
        width: 60,
        height: 60,
        borderRadius: 30,
        borderWidth: 2,
        borderColor: '#fff',
    },
    expandedImage: {
        width: SCREEN_WIDTH * 0.6,
        height: SCREEN_WIDTH * 0.6,
        borderRadius: (SCREEN_WIDTH * 0.6) / 2,
        borderWidth: 4,
        borderColor: '#fff',
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.4)',
        zIndex: 999,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 25,
        paddingHorizontal: 12,
        paddingVertical: 15,
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowRadius: 5,
        elevation: 3,
    },
    searchContainerWrapper: {
        width: '100%',
        alignSelf: 'center',
    },
    iconLeft: {
        marginRight: 8,
    },
    iconRight: {
        marginLeft: 8,
    },
    searchInput: {
        flex: 1,
        fontSize: 16,
        color: 'black',
    },
    sectionTitle: {
        marginTop: 10,
        marginBottom: 10,
        fontWeight: 'bold',
        fontSize: 25,
    },
    scrollViewStyle: {
        backgroundColor: 'transparent',
        marginBottom: 20,
    },
    scrollContentContainer: {
        paddingHorizontal: 0,
    },
    optionButton: {
        paddingHorizontal: 18,
        paddingVertical: 10,
        backgroundColor: '#ffffff',
        borderRadius: 20,
        marginRight: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    optionButtonSelected: {
        backgroundColor: 'black',
    },
    optionButtonText: {
        fontSize: 14,
        color: 'black',
        fontWeight: '500',
    },
    optionButtonTextSelected: {
        color: 'white',
    },
    imageCard: {
        width: IMAGE_WIDTH,
        height: IMAGE_HEIGHT,
        marginHorizontal: -8,
        borderRadius: 20,
        overflow: 'hidden',
        backgroundColor: '#ddd',
        alignSelf: 'center',
    },
    image: {
        width: '100%',
        height: '100%',
    },
    tabBarContainer: {
        position: 'absolute',
        bottom: 30,
        alignSelf: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#000',
        paddingHorizontal: 30,
        paddingVertical: 20,
        borderRadius: 40,
        height: 80,
        zIndex: 10,
    },
    tabButton: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
    },
    circleBehindIcon: {
        position: 'absolute',
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: 'white',
        zIndex: 1,
    },
});
