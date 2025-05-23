// LoginScreen.js
import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
    ImageBackground,
} from 'react-native';
import Swiper from 'react-native-swiper';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function LoginScreen({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        navigation.navigate('Home');
    };

    const backgroundImages = [
        require('../assets/Log.jpg'),
        require('../assets/log1.jpg'),
        require('../assets/log2.jpg'),
        require('../assets/log3.jpg'),
    ];

    return (
        <View style={styles.swiperContainer}>
            <Swiper
                autoplay
                loop
                autoplayTimeout={5}
                showsPagination={false}
                removeClippedSubviews={false}
            >
                {backgroundImages.map((image, index) => (
                    <View key={index} style={styles.slide}>
                        <ImageBackground
                            source={image}
                            style={styles.background}
                            resizeMode="cover"
                        >
                            <View style={styles.overlay}>
                                <View style={styles.container}>
                                    <Text style={styles.title}>Login</Text>

                                    <TextInput
                                        placeholder="Email"
                                        placeholderTextColor="grey"
                                        style={styles.input}
                                        value={email}
                                        onChangeText={setEmail}
                                        keyboardType="email-address"
                                        autoCapitalize="none"
                                    />

                                    <TextInput
                                        placeholder="Password"
                                        placeholderTextColor="grey"
                                        style={styles.input}
                                        value={password}
                                        onChangeText={setPassword}
                                        secureTextEntry
                                    />

                                    <TouchableOpacity style={styles.button} onPress={handleLogin}>
                                        <Text style={styles.buttonText}>Log In</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </ImageBackground>
                    </View>
                ))}
            </Swiper>
        </View>
    );
}

const styles = StyleSheet.create({
    swiperContainer: {
        flex: 1,
    },
    slide: {
        flex: 1,
    },
    background: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.4)',
        justifyContent: 'center',
    },
    container: {
        justifyContent: 'center',
        paddingHorizontal: SCREEN_WIDTH * 0.05,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color: '#ffffff',
        textShadowColor: 'rgba(0, 0, 0, 0.7)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 4,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 15,
        padding: 12,
        marginBottom: 15,
        width: '100%',
        backgroundColor: '#f5f6f7',
    },
    button: {
        backgroundColor: '#212529',
        paddingVertical: 12,
        width: '60%',
        alignSelf: 'center',
        borderRadius: 20,
        alignItems: 'center',
        marginTop: 10,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
    },
});
