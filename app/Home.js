import React, { useState, useRef } from 'react';
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
    FlatList,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const IMAGE_WIDTH = SCREEN_WIDTH * 1;

export default function HomeScreen({ navigation }) {
    const [isImageExpanded, setIsImageExpanded] = useState(false);
    const scaleAnim = useRef(new Animated.Value(1)).current;
    const [selectedIndex, setSelectedIndex] = useState(null);
    const scrollX = useRef(new Animated.Value(0)).current;

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

    const options = ['Beach', 'Mountain', 'City', 'Forest', 'Desert', 'Lake'];

    const handleOptionPress = (index) => {
        if (selectedIndex === index) {
            setSelectedIndex(null);
        } else {
            setSelectedIndex(index);
        }
    };

    const images = [
        require('../assets/log1.jpg'),
        require('../assets/log2.jpg'),
        require('../assets/log3.jpg'),
        require('../assets/Log.jpg'),
    ];

    return (
        <View style={styles.container}>
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
                    <TouchableOpacity>
                        <Ionicons name="search" size={20} color="gray" style={styles.iconLeft} />
                    </TouchableOpacity>
                    <TextInput
                        placeholder="Search"
                        style={styles.searchInput}
                        placeholderTextColor="gray"
                    />
                    <TouchableOpacity>
                        <Ionicons name="options-outline" size={22} color="black" style={styles.iconRight} />
                    </TouchableOpacity>
                </View>

                <Text style={{ marginTop: 20, marginBottom: 10, fontWeight: 'bold', fontSize: 25 }}>
                    Select your next trip
                </Text>

                <View style={styles.scrollContainer}>
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.scrollContentContainer}
                        style={styles.scrollViewStyle}
                    >
                        {options.map((option, index) => {
                            const isSelected = selectedIndex === index;
                            return (
                                <TouchableOpacity
                                    key={index}
                                    style={[
                                        styles.optionButton,
                                        isSelected && styles.optionButtonSelected,
                                    ]}
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

                <Animated.FlatList
                    data={images}
                    keyExtractor={(_, index) => index.toString()}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    decelerationRate="fast"
                    bounces={false}
                    snapToInterval={IMAGE_WIDTH}
                    contentContainerStyle={{
                        paddingHorizontal: (SCREEN_WIDTH - IMAGE_WIDTH) / 2,
                    }}
                    onScroll={Animated.event(
                        [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                        { useNativeDriver: true }
                    )}
                    scrollEventThrottle={16}
                    renderItem={({ item, index }) => {
                        const inputRange = [
                            (index - 1) * IMAGE_WIDTH,
                            index * IMAGE_WIDTH,
                            (index + 1) * IMAGE_WIDTH,
                        ];

                        const translateY = scrollX.interpolate({
                            inputRange,
                            outputRange: [20, 0, 20],
                            extrapolate: 'clamp',
                        });

                        const scale = scrollX.interpolate({
                            inputRange,
                            outputRange: [0.9, 1, 0.9],
                            extrapolate: 'clamp',
                        });

                        return (
                            <Animated.View
                                style={{
                                    width: IMAGE_WIDTH,
                                    height: IMAGE_WIDTH,
                                    marginHorizontal: -20, // overlap images
                                    transform: [{ translateY }, { scale }],
                                    borderRadius: 15,
                                    overflow: 'hidden',
                                    backgroundColor: '#ccc',
                                }}
                            >
                                <Image
                                    source={item}
                                    style={{ width: '100%', height: '100%' }}
                                    resizeMode="cover"
                                />
                            </Animated.View>
                        );
                    }}
                />
            </View>

            {isImageExpanded && (
                <TouchableWithoutFeedback onPress={handleCollapse}>
                    <View style={styles.overlay}>
                        <Animated.Image
                            source={require('../assets/man1.jpg')}
                            style={styles.expandedImage}
                        />
                    </View>
                </TouchableWithoutFeedback>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: SCREEN_WIDTH * 0.06,
        paddingVertical: 60,
        backgroundColor: '#f5f6f7',
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
    scrollContainer: {
        backgroundColor: 'transparent',
        marginTop: 10,
        marginBottom: 20,
    },
    scrollViewStyle: {
        backgroundColor: 'transparent',
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
});