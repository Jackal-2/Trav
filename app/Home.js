import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
    TextInput,
    Image,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'; // Make sure this is installed

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function HomeScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <View style={styles.textContainer}>
                    <Text style={styles.greeting}>Hello, Fred</Text>
                    <Text style={styles.subGreeting}>Welcome to travel</Text>
                </View>
                <Image
                    source={require('../assets/man1.jpg')}
                    style={styles.profileImage}
                />
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
            </View>
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
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 15,
        paddingHorizontal: 12,
        paddingVertical: 15,
        marginTop: 20,
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
});
