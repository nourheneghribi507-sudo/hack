import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, Text, View, ScrollView, TextInput, 
  Image, TouchableOpacity, SafeAreaView, StatusBar, 
  KeyboardAvoidingView, Platform, useWindowDimensions 
} from 'react-native';
import { 
  LayoutDashboard, MessageSquare, Calendar, 
  HardDrive, Shield, Send, Cpu, Share2, 
  MapPin, Clock, ArrowRight 
} from 'lucide-react-native';
import { Theme, CyberButton, CyberCard } from './components';
import { registerRootComponent } from 'expo';

function App() {
  const { width, height } = useWindowDimensions();
  const isSmallDevice = width < 380;
  const isMediumDevice = width >= 380 && width < 480;

  const [screen, setScreen] = useState('splash');
  const [currentAgent, setCurrentAgent] = useState('architect');
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isThinking, setIsThinking] = useState(false);

  // --- Login Logic ---
  const handleLogin = () => {
    setScreen('dashboard');
  };

  // --- Chat Logic ---
  const handleSend = () => {
    if (!inputText.trim()) return;
    
    const userMsg = { id: Date.now(), text: inputText, isUser: true };
    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsThinking(true);

    // Simulate Agent Delay
    setTimeout(() => {
      const botMsg = { 
        id: Date.now() + 1, 
        text: `As your ${currentAgent} assistant, I've analyzed your request. I recommend we move forward with a 15% budget increase based on last year's performance.`, 
        isUser: false 
      };
      setMessages(prev => [...prev, botMsg]);
      setIsThinking(false);
    }, 1500);
  };

  // --- Screen Components ---
  
  const SplashScreen = () => (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.center} showsVerticalScrollIndicator={false}>
        <View style={styles.heroCircle}>
             <Text style={styles.heroText}>HELLO</Text>
             <Text style={[styles.heroText, {color: Theme.magenta}]}>VITAL</Text>
        </View>
        <Text style={styles.subtitle}>SECURE_ACCESS_GRANTED</Text>
        <CyberButton 
          title="ENTER MAINFRAME" 
          onPress={() => setScreen('login')}
          style={{ marginTop: 40, width: '100%' }}
        />
      </ScrollView>
    </SafeAreaView>
  );

  const LoginScreen = () => (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{flex: 1}}>
        <ScrollView contentContainerStyle={styles.loginContent} showsVerticalScrollIndicator={false}>
          <Text style={styles.h1}>WELCOME BACK</Text>
          <Text style={styles.pSecondary}>Accessing encrypted data...</Text>
          
          <View style={styles.inputGroup}>
            <Text style={styles.label}>EMAIL ADDRESS</Text>
            <TextInput style={styles.input} placeholder="admin@vital.ai" placeholderTextColor="#444" />
          </View>
          
          <View style={styles.inputGroup}>
            <Text style={styles.label}>PASSWORD</Text>
            <TextInput style={styles.input} secureTextEntry={true} placeholder="••••••••" placeholderTextColor="#444" />
          </View>
          
          <CyberButton title="AUTHENTICATE" onPress={handleLogin} />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );

  const Dashboard = () => (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View>
            <View style={styles.statusBadge}>
              <View style={styles.dot} />
              <Text style={styles.statusText}>SYSTEMS ACTIVE</Text>
            </View>
            <Text style={styles.h1}>Hello, <Text style={{color: Theme.cyan}}>Admin</Text></Text>
            <Text style={styles.pSeconary}>Here is your club's pulse today.</Text>
          </View>
          <View style={styles.avatar} />
        </View>

        <View style={styles.statGrid}>
          <CyberCard style={styles.statCard}>
            <Calendar color={Theme.cyan} size={24} />
            <Text style={styles.statLabel}>Active Events</Text>
            <Text style={styles.statValue}>12</Text>
          </CyberCard>
          <CyberCard style={styles.statCard}>
            <Shield color={Theme.magenta} size={24} />
            <Text style={styles.statLabel}>Threats Blocked</Text>
            <Text style={styles.statValue}>04</Text>
          </CyberCard>
        </View>

        <Text style={[styles.h2, {marginTop: 20}]}>AI_INSIGHTS</Text>
        <CyberCard accent={Theme.cyan}>
          <Text style={styles.p}>Based on your history, the Architect suggests increasing workshop frequency for Q3.</Text>
        </CyberCard>
        
        <View style={{height: 100}} />
      </ScrollView>
    </SafeAreaView>
  );

  const Chat = () => (
    <View style={styles.container}>
      <View style={styles.agentSelector}>
        {['architect', 'liaison', 'sentinel'].map(a => (
          <TouchableOpacity 
            key={a} 
            onPress={() => setCurrentAgent(a)}
            style={[styles.agentPill, currentAgent === a && styles.activePill]}
          >
            <Text style={[styles.pillText, currentAgent === a && {color: Theme.bg}]}>{a.toUpperCase()}</Text>
          </TouchableOpacity>
        ))}
      </View>
      
      <ScrollView contentContainerStyle={styles.chatScroll}>
        {messages.map(m => (
          <View key={m.id} style={[styles.msg, m.isUser ? styles.msgUser : styles.msgBot]}>
            <Text style={[styles.msgText, m.isUser && {color: Theme.bg}]}>{m.text}</Text>
          </View>
        ))}
        {isThinking && (
          <View style={styles.msgBot}>
            <Text style={styles.msgText}>Processing request...</Text>
          </View>
        )}
      </ScrollView>

      <View style={styles.chatInputArea}>
        <TextInput 
          style={styles.chatInput} 
          placeholder={`Talk to ${currentAgent}...`}
          placeholderTextColor="#666"
          value={inputText}
          onChangeText={setInputText}
        />
        <TouchableOpacity style={styles.sendIcon} onPress={handleSend}>
          <Send color={Theme.bg} size={20} />
        </TouchableOpacity>
      </View>
    </View>
  );

  // --- Layout Selection ---
  
  const renderContent = () => {
    switch(screen) {
      case 'splash': return <SplashScreen />;
      case 'login': return <LoginScreen />;
      case 'dashboard': return <Dashboard />;
      case 'chat': return <Chat />;
      default: return <Dashboard />;
    }
  };

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      {renderContent()}
      
      {['dashboard', 'chat'].includes(screen) && (
        <View style={styles.navBar}>
          <TouchableOpacity style={styles.navItem} onPress={() => setScreen('dashboard')}>
            <LayoutDashboard color={screen === 'dashboard' ? Theme.cyan : Theme.textSecondary} size={24} />
            <Text style={[styles.navText, screen === 'dashboard' && {color: Theme.cyan}]}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem} onPress={() => setScreen('chat')}>
            <MessageSquare color={screen === 'chat' ? Theme.cyan : Theme.textSecondary} size={24} />
            <Text style={[styles.navText, screen === 'chat' && {color: Theme.cyan}]}>AI Chat</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem}>
            <Calendar color={Theme.textSecondary} size={24} />
            <Text style={styles.navText}>Events</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem}>
            <Shield color={Theme.textSecondary} size={24} />
            <Text style={styles.navText}>Security</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Theme.bg, paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 },
  container: { flex: 1 },
  center: { flexGrow: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: '8%' },
  content: { flex: 1, paddingHorizontal: '5%' },
  header: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 25, marginTop: 25, alignItems: 'center' },
  logo: { width: width * 0.25, height: width * 0.25, borderRadius: (width * 0.25) / 2, marginBottom: 20 },
  title: { fontSize: isSmallDevice ? 32 : 38, fontWeight: '900', color: Theme.cyan, letterSpacing: 5 },
  subtitle: { fontSize: 10, color: Theme.textSecondary, letterSpacing: 2, fontWeight: '600', textAlign: 'center', lineHeight: 16 },
  heroCircle: { 
    width: width * 0.55, height: width * 0.55, borderRadius: (width * 0.55) / 2, 
    borderWidth: 1.5, borderColor: Theme.cyan,
    alignItems: 'center', justifyContent: 'center', marginBottom: 25,
    backgroundColor: 'rgba(0, 245, 212, 0.05)',
    ...Platform.select({
      android: { elevation: 10 },
      ios: { shadowColor: Theme.cyan, shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0.3, shadowRadius: 15 }
    })
  },
  heroText: { fontSize: isSmallDevice ? 24 : 30, fontWeight: '900', color: Theme.cyan, letterSpacing: 2 },
  h1: { fontSize: isSmallDevice ? 22 : 26, fontWeight: '800', color: Theme.text, lineHeight: 32 },
  h2: { fontSize: 18, fontWeight: '700', color: Theme.textSecondary, marginBottom: 15 },
  p: { fontSize: 14, color: Theme.text, lineHeight: 22 },
  pSecondary: { fontSize: 14, color: Theme.textSecondary, marginBottom: 30 },
  label: { fontSize: 11, color: Theme.cyan, marginBottom: 8, fontWeight: '700' },
  avatar: { width: 42, height: 42, borderRadius: 12, backgroundColor: '#334155', borderWidth: 2, borderColor: Theme.cyan },
  
  loginContent: { flexGrow: 1, justifyContent: 'center', padding: '8%' },
  inputGroup: { marginBottom: 20, width: '100%' },
  input: { backgroundColor: 'rgba(15,23,42,0.8)', padding: 15, borderRadius: 12, color: 'white', borderWidth: 1, borderColor: Theme.border, fontSize: 16 },
  
  statGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginBottom: 15 },
  statCard: { flex: 1, minWidth: '45%', padding: 12 },
  statLabel: { fontSize: 11, color: Theme.textSecondary, marginTop: 6 },
  statValue: { fontSize: isSmallDevice ? 20 : 24, fontWeight: '800', color: Theme.text },
  
  statusBadge: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 8 },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#22c55e' },
  statusText: { fontSize: 9, color: '#22c55e', fontWeight: '800' },
  
  navBar: { 
    flexDirection: 'row', 
    height: Platform.OS === 'ios' ? 85 : 65, 
    borderTopWidth: 1, 
    borderTopColor: Theme.border, 
    paddingBottom: Platform.OS === 'ios' ? 25 : 0, 
    backgroundColor: Theme.bg,
    alignItems: 'center'
  },
  navItem: { flex: 1, alignItems: 'center', justifyContent: 'center', height: '100%' },
  navText: { fontSize: 9, color: Theme.textSecondary, marginTop: 4, fontWeight: '700' },

  agentSelector: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, padding: 15, borderBottomWidth: 1, borderBottomColor: Theme.border },
  agentPill: { paddingVertical: 6, paddingHorizontal: 12, borderRadius: 20, borderWidth: 1, borderColor: Theme.border },
  activePill: { backgroundColor: Theme.cyan, borderColor: Theme.cyan },
  pillText: { fontSize: 10, fontWeight: '800', color: Theme.text },

  chatScroll: { padding: '5%', gap: 12, paddingBottom: 110 },
  msg: { maxWidth: '85%', padding: 14, borderRadius: 16 },
  msgUser: { alignSelf: 'flex-end', backgroundColor: Theme.cyan, borderBottomRightRadius: 2 },
  msgBot: { alignSelf: 'flex-start', backgroundColor: 'rgba(15,23,42,0.8)', borderWidth: 1, borderColor: Theme.border, borderBottomLeftRadius: 2 },
  msgText: { fontSize: 14, color: 'white', lineHeight: 20 },

  chatInputArea: { 
    flexDirection: 'row', 
    paddingHorizontal: 15, 
    paddingTop: 12,
    paddingBottom: Platform.OS === 'ios' ? 30 : 15, 
    gap: 10, 
    alignItems: 'center', 
    borderTopWidth: 1, 
    borderColor: Theme.border,
    backgroundColor: Theme.bg
  },
  chatInput: { flex: 1, backgroundColor: 'rgba(15,23,42,0.8)', padding: 12, borderRadius: 12, color: 'white', borderWidth: 1, borderColor: Theme.border, fontSize: 15 },
  sendIcon: { backgroundColor: Theme.cyan, width: 44, height: 44, borderRadius: 12, alignItems: 'center', justifyContent: 'center' }
});
registerRootComponent(App);
