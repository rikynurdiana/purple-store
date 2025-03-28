import React, {memo, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Linking,
  SafeAreaView,
  StatusBar,
  Platform,
  ImageBackground,
} from 'react-native';
import BottomNavigation from '@/components/navigation/BottomNavigation';
import {PROFILE_SCREEN} from '@/constant';

const InfoItem = ({label, value}: {label: string; value: string}) => (
  <View style={styles.infoItem}>
    <Text style={styles.infoLabel}>{label}</Text>
    <Text style={styles.infoValue}>{value}</Text>
  </View>
);

function ProfileScreen() {
  const [activeTab, setActiveTab] = useState(PROFILE_SCREEN);
  const userProfile = {
    name: 'Riky Nurdiana',
    email: 'nurdiana.riky@gmail.com',
    phone: '+6282315099988',
    address: 'Indonesia, Jawa Barat, Bandung 40553',
    github: 'https://github.com/rikynurdiana/purple-store',
    linkedin: 'https://www.linkedin.com/in/riky-nurdiana',
    avatar: require('@/assets/images/riky.png'),
    bio: 'Frontend Engineer with 7 years of experience develop web apps and mobile apps',
    language: 'Bahasa Indonesia - English',
    interests: ['Mobile Development', 'Web Development', 'Open Source'],
    skills: [
      'React',
      'React Native',
      'TypeScript',
      'Node.js',
      'Next JS',
      'Vite',
      'Tailwind CSS',
      'Nest JS',
      'Postgres',
      'Prisma',
    ],
  };

  const handleLink = (url: string) => {
    Linking.openURL(url);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#0A0A0F" />
      <ScrollView style={styles.container}>
        <ImageBackground
          source={require('@/assets/images/bg-img.png')}
          style={styles.backgroundImage}
          imageStyle={styles.backgroundImageStyle}>
          <View style={styles.header}>
            <Image source={userProfile.avatar} style={styles.avatar} />
            <Text style={styles.name}>{userProfile.name}</Text>
            <Text style={styles.bio}>{userProfile.bio}</Text>
          </View>
        </ImageBackground>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Contact Information</Text>
          <InfoItem label="Email" value={userProfile.email} />
          <InfoItem label="Phone" value={userProfile.phone} />
          <InfoItem label="Address" value={userProfile.address} />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Social Links</Text>
          <TouchableOpacity onPress={() => handleLink(userProfile.github)}>
            <View style={styles.socialLink}>
              <Image
                source={require('@/assets/icons/github.png')}
                style={styles.socialIcon}
              />
              <Text style={styles.socialText}>GitHub Profile</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleLink(userProfile.linkedin)}>
            <View style={styles.socialLink}>
              <Image
                source={require('@/assets/icons/linkedin.png')}
                style={styles.socialIcon}
              />
              <Text style={styles.socialText}>LinkedIn Profile</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Additional Information</Text>
          <InfoItem label="Language" value={userProfile.language} />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Skills</Text>
          <View style={styles.tagContainer}>
            {userProfile.skills.map((skill, index) => (
              <View key={index} style={styles.tag}>
                <Text style={styles.tagText}>{skill}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Interests</Text>
          <View style={styles.tagContainer}>
            {userProfile.interests.map((interest, index) => (
              <View key={index} style={styles.tag}>
                <Text style={styles.tagText}>{interest}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
      <BottomNavigation activeTab={activeTab} onTabPress={setActiveTab} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#0A0A0F',
  },
  container: {
    flex: 1,
    backgroundColor: '#0A0A0F',
    marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    marginBottom: 50,
  },
  header: {
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#1E1E1E',
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  bio: {
    fontSize: 14,
    color: '#888',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  section: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#1E1E1E',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  infoItem: {
    marginBottom: 12,
  },
  infoLabel: {
    fontSize: 14,
    color: '#888',
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 16,
    color: '#FFFFFF',
  },
  socialLink: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E1E1E',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  socialIcon: {
    width: 24,
    height: 24,
    marginRight: 12,
  },
  socialText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  tag: {
    backgroundColor: '#2D2D2D',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  tagText: {
    color: '#FFFFFF',
    fontSize: 14,
  },
  backgroundImage: {
    width: '100%',
    marginBottom: 10,
    marginTop: 10,
  },
  backgroundImageStyle: {
    opacity: 0.9,
  },
});

export default memo(ProfileScreen);
