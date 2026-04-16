import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, Text, View, ScrollView, TextInput, 
  Image, TouchableOpacity, SafeAreaView, StatusBar, 
  KeyboardAvoidingView, Platform, Dimensions 
} from 'react-native';
import { 
  LayoutDashboard, MessageSquare, Calendar, 
  HardDrive, Shield, Send, Cpu, Share2, 
  MapPin, Clock, ArrowRight 
} from 'lucide-react-native';
import { Theme, CyberButton, CyberCard } from './components';
import { registerRootComponent } from 'expo';

function App() {
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
    <View style={styles.container}>
      <View style={styles.center}>
        <View style={styles.heroCircle}>
             <Text style={styles.heroText}>HELLO</Text>
             <Text style={[styles.heroText, {color: Theme.magenta}]}>TPL</Text>
        </View>
        <Text style={styles.subtitle}>SECURE_ACCESS_GRANTED</Text>
        <CyberButton 
          title="ENTER MAINFRAME" 
          onPress={() => setScreen('login')}
          style={{ marginTop: 60 }}
        />
      </View>
    </View>
  );

  const LoginScreen = () => (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
      <View style={styles.loginContent}>
        <Text style={styles.h1}>WELCOME BACK</Text>
        <Text style={styles.pSeconary}>Accessing encrypted data...</Text>
        
        <View style={styles.inputGroup}>
          <Text style={styles.label}>EMAIL ADDRESS</Text>
          <TextInput style={styles.input} placeholder="admin@tpl.ai" placeholderTextColor="#444" />
        </View>
        
        <View style={styles.inputGroup}>
          <Text style={styles.label}>PASSWORD</Text>
          <TextInput style={styles.input} secureTextEntry={true} placeholder="••••••••" placeholderTextColor="#444" />
        </View>
        
        <CyberButton title="LOGIN" onPress={handleLogin} />
      </View>
    </KeyboardAvoidingView>
  );

  const Dashboard = () => (
    <ScrollView style={styles.content}>
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
    </ScrollView>
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
    <SafeAreaView style={styles.root}>
      <StatusBar barStyle="light-content" />
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Theme.bg },
  container: { flex: 1 },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 20 },
  content: { flex: 1, padding: 20 },
  header: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 30, marginTop: 20 },
  logo: { width: 120, height: 120, borderRadius: 60, marginBottom: 20 },
  title: { fontSize: 40, fontWeight: '900', color: Theme.cyan, letterSpacing: 5 },
  subtitle: { fontSize: 12, color: Theme.textSecondary, letterSpacing: 2, fontWeight: '600' },
  heroCircle: { 
    width: 200, height: 200, borderRadius: 100, 
    borderWidth: 1, borderColor: Theme.cyan,
    alignItems: 'center', justifyContent: 'center', marginBottom: 30,
    backgroundColor: 'rgba(0, 245, 212, 0.05)'
  },
  heroText: { fontSize: 32, fontWeight: '900', color: Theme.cyan, letterSpacing: 2 },
  h1: { fontSize: 28, fontWeight: '800', color: Theme.text },
  h2: { fontSize: 18, fontWeight: '700', color: Theme.textSecondary, marginBottom: 15 },
  p: { fontSize: 14, color: Theme.text, lineHeight: 22 },
  pSeconary: { fontSize: 14, color: Theme.textSecondary },
  label: { fontSize: 12, color: Theme.cyan, marginBottom: 8, fontWeight: '700' },
  avatar: { width: 50, height: 50, borderRadius: 12, backgroundColor: '#334155', borderWidth: 2, borderColor: Theme.cyan },
  
  loginContent: { flex: 1, justifyContent: 'center', padding: 30 },
  inputGroup: { marginBottom: 20 },
  input: { backgroundColor: 'rgba(15,23,42,0.8)', padding: 15, borderRadius: 12, color: 'white', borderWidth: 1, borderColor: Theme.border },
  
  statGrid: { flexDirection: 'row', gap: 15 },
  statCard: { flex: 1, padding: 15 },
  statLabel: { fontSize: 12, color: Theme.textSecondary, marginTop: 8 },
  statValue: { fontSize: 24, fontWeight: '800', color: Theme.text },
  
  statusBadge: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 8 },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#22c55e' },
  statusText: { fontSize: 10, color: '#22c55e', fontWeight: '800' },
  
  navBar: { flexDirection: 'row', height: 80, borderTopWidth: 1, borderTopColor: Theme.border, paddingBottom: 20 },
  navItem: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  navText: { fontSize: 10, color: Theme.textSecondary, marginTop: 4, fontWeight: '600' },

  agentSelector: { flexDirection: 'row', gap: 10, padding: 20, borderBottomWidth: 1, borderBottomColor: Theme.border },
  agentPill: { paddingVertical: 6, paddingHorizontal: 12, borderRadius: 20, borderWidth: 1, borderColor: Theme.border },
  activePill: { backgroundColor: Theme.cyan, borderColor: Theme.cyan },
  pillText: { fontSize: 10, fontWeight: '800', color: Theme.text },

  chatScroll: { padding: 20, gap: 15 },
  msg: { maxWidth: '85%', padding: 15, borderRadius: 20 },
  msgUser: { alignSelf: 'flex-end', backgroundColor: Theme.cyan, borderBottomRightRadius: 2 },
  msgBot: { alignSelf: 'flex-start', backgroundColor: 'rgba(15,23,42,0.8)', borderWidth: 1, borderColor: Theme.border, borderBottomLeftRadius: 2 },
  msgText: { fontSize: 14, color: 'white', lineHeight: 20 },

  chatInputArea: { flexDirection: 'row', padding: 15, paddingBottom: 30, gap: 10, alignItems: 'center' },
  chatInput: { flex: 1, backgroundColor: 'rgba(15,23,42,0.8)', padding: 12, borderRadius: 12, color: 'white', borderWidth: 1, borderColor: Theme.border },
  sendIcon: { backgroundColor: Theme.cyan, width: 45, height: 45, borderRadius: 12, alignItems: 'center', justifyContent: 'center' }
});
registerRootComponent(App);
