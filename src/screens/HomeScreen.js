import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { View, TouchableOpacity, ActivityIndicator, FlatList, Text, Image, ScrollView, Dimensions } from 'react-native';
import { Plus, Smile, RefreshCcw, Trash2, ChevronLeft, ChevronRight } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import Animated, { useSharedValue, useAnimatedStyle, withDelay, withTiming, FadeInDown } from 'react-native-reanimated';
import ScreenContainer from '../components/ScreenContainer';
import AppHeader from '../components/AppHeader';
import Card from '../components/Card';
import Button from '../components/Button';
import { Body, Subheading, Caption } from '../components/Typography';
import { SCREENS } from '../constants/screens';
import { fetchLatestEntries } from '../services/api';
import { addEntry, removeEntry } from '../store/slices/entriesSlice';
import { useTheme } from '../context/ThemeContext';
import AudioPlayer from '../components/AudioPlayer';

const AnimatedEntry = ({ children, index }) => {
  return (
    <Animated.View 
      entering={FadeInDown.delay(index * 100).duration(500)}
    >
      {children}
    </Animated.View>
  );
};

export default function HomeScreen() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { colors } = useTheme();

  console.log('HomeScreen rendered');
  
  // Get entries from Redux store
  const entries = useSelector(state => state.entries.list);
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Generate Quick Jump data (30 days centered around today)
  const quickJumpDays = useMemo(() => {
    const today = new Date();
    
    return Array.from({ length: 30 }).map((_, i) => {
      const date = new Date(today);
      date.setDate(today.getDate() - 15 + i);
      return {
        day: ['S', 'M', 'T', 'W', 'T', 'F', 'S'][date.getDay()],
        date: date.getDate().toString(),
        fullDate: date,
        active: date.toDateString() === today.toDateString()
      };
    });
  }, []);

  const hasFetchedRef = React.useRef(false);

  const loadData = useCallback(async () => {
    // Only fetch if store is empty (as a demo of API integration)
    // Prevent infinite loops by using a ref to track if we've already fetched
    if (entries.length > 5 || hasFetchedRef.current) return; 

    hasFetchedRef.current = true;
    setLoading(true);
    setError(null);
    try {
      const data = await fetchLatestEntries();
      // Add each fetched entry to Redux
      data.forEach(item => {
        dispatch(addEntry({
          id: `api-${item.id}`, // Use API ID with prefix to avoid clashes
          title: item.title,
          body: item.body,
          date: '2025-04-19',
          mood: '😊'
        }));
      });
    } catch (err) {
      setError(err.message);
      hasFetchedRef.current = false; // Allow retry on error
    } finally {
      setLoading(false);
    }
  }, [entries.length, dispatch]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleNewEntry = useCallback(() => {
    navigation.navigate(SCREENS.NEW_ENTRY);
  }, [navigation]);

  const handleViewAll = useCallback(() => {
    navigation.navigate(SCREENS.CALENDAR);
  }, [navigation]);

  const handleEntryPress = useCallback((id) => {
    navigation.navigate(SCREENS.ENTRY_DETAIL, { id });
  }, [navigation]);

  const handleRemoveEntry = useCallback((id) => {
    dispatch(removeEntry(id));
  }, [dispatch]);

  const lastEntry = entries.length > 0 ? entries[0] : null;

  const getMoodDetails = (emoji) => {
    const moodMap = {
      '😊': { title: 'Happy', desc: 'Feeling good and positive' },
      '😌': { title: 'Calm', desc: 'Feeling peaceful and centered' },
      '😔': { title: 'Sad', desc: 'Feeling down or reflective' },
      '😰': { title: 'Anxious', desc: 'Feeling worried or stressed' },
      '😡': { title: 'Angry', desc: 'Feeling frustrated or upset' },
      '😴': { title: 'Tired', desc: 'Feeling sleepy or exhausted' }
    };
    return moodMap[emoji] || { title: 'Unknown', desc: 'No mood logged' };
  };

  const currentMoodDetails = lastEntry ? getMoodDetails(lastEntry.emoji || lastEntry.mood) : null;

  const renderHeader = () => (
    <View>
      {/* Header */}
      <View className="px-6">
        <AppHeader 
          title="MindLog" 
          subtitle={new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })} 
        />
      </View>

      {/* Current Mood */}
      <View className="px-6 pt-6 pb-4">
        <Card className="gap-3" style={{ backgroundColor: colors.card, borderColor: colors.border }}>
          <View className="flex-row justify-between">
            <Body style={{ color: colors.subtext }}>Current Mood</Body>
            <Caption>
              {lastEntry ? (lastEntry.date === new Date().toISOString().split('T')[0] ? `Today, ${lastEntry.time}` : `${lastEntry.date}, ${lastEntry.time}`) : 'No entries yet'}
            </Caption>
          </View>
          <View className="flex-row items-center gap-4">
            <View className="w-14 h-14 rounded-full justify-center items-center" style={{ backgroundColor: colors.border }}>
              {lastEntry && (lastEntry.emoji || lastEntry.mood) ? (
                <Text style={{ fontSize: 28 }}>{lastEntry.emoji || lastEntry.mood}</Text>
              ) : (
                <Smile color={colors.text} size={24} />
              )}
            </View>
            <View className="flex-1">
              <Subheading className="text-lg leading-[26px]" style={{ color: colors.text }}>
                {currentMoodDetails ? currentMoodDetails.title : 'Not logged'}
              </Subheading>
              <Body style={{ color: colors.subtext }}>
                {currentMoodDetails ? currentMoodDetails.desc : 'Create an entry to log your mood'}
              </Body>
            </View>
          </View>
        </Card>
      </View>

      {/* New Entry Button */}
      <View className="px-6 pb-6">
        <Button 
          title="New entry"
          icon={Plus}
          onPress={handleNewEntry}
        />
      </View>

      <View className="px-6 pb-3 flex-row justify-between items-center">
        <Subheading style={{ color: colors.text }}>Recent Entries</Subheading>
        <TouchableOpacity onPress={handleViewAll}>
          <Body style={{ color: colors.text }}>View All</Body>
        </TouchableOpacity>
      </View>

      {loading && (
        <View className="py-10 items-center justify-center">
          <ActivityIndicator size="large" color={colors.text} />
          <Caption className="mt-2">Fetching your thoughts...</Caption>
        </View>
      )}

      {error && (
        <View className="px-6 py-8 items-center gap-4 mx-6 rounded-xl border" style={{ backgroundColor: colors.card, borderColor: colors.border }}>
          <Body className="text-red-800 text-center">{error}</Body>
          <Button 
            title="Try Again" 
            variant="secondary" 
            icon={RefreshCcw}
            onPress={loadData}
            className="h-10"
          />
        </View>
      )}
    </View>
  );

  const screenWidth = Dimensions.get('window').width;
  const ITEM_WIDTH = 61; // 45px width + 16px horizontal margins (mx-2)
  const CENTER_OFFSET = Math.max(0, 15 * ITEM_WIDTH - (screenWidth / 2) + (ITEM_WIDTH / 2));

  const renderFooter = () => (
    <View className="py-6 gap-3">
      <View className="px-6">
        <Subheading style={{ color: colors.text }}>Quick Jump</Subheading>
      </View>
      <View className="relative justify-center">
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 24 }}
          contentContainerClassName="flex-row items-center"
          contentOffset={{ x: CENTER_OFFSET, y: 0 }}
        >
          {quickJumpDays.map((item, index) => (
            <TouchableOpacity 
              key={index} 
              className="items-center gap-1.5 mx-2"
              onPress={() => navigation.navigate(SCREENS.CALENDAR, { date: item.fullDate.toISOString() })}
              style={{ width: 45 }}
            >
              <Caption>{item.day}</Caption>
              <View className={`w-full aspect-square rounded-xl justify-center items-center ${item.active ? '' : 'border'}`} style={{ backgroundColor: item.active ? colors.text : colors.card, borderColor: colors.border }}>
                <Body style={{ color: item.active ? colors.background : colors.text, fontSize: 13 }}>
                  {item.date}
                </Body>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
        {/* Subtle scroll arrows */}
        <View pointerEvents="none" className="absolute left-0 top-0 bottom-0 w-8 justify-center items-start pl-2">
          <ChevronLeft color={colors.subtext} size={20} opacity={0.4} />
        </View>
        <View pointerEvents="none" className="absolute right-0 top-0 bottom-0 w-8 justify-center items-end pr-2">
          <ChevronRight color={colors.subtext} size={20} opacity={0.4} />
        </View>
      </View>
    </View>
  );

  return (
    <ScreenContainer padding={false} scrollable={false} backgroundColor={colors.background}>
      <FlatList
        data={loading ? [] : entries.slice(0, 5)}
        keyExtractor={item => item.id}
        ListHeaderComponent={renderHeader}
        ListFooterComponent={!loading && !error ? renderFooter : null}
        contentContainerStyle={{ paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <View className="px-6 pb-3">
            <AnimatedEntry index={index}>
              <Card 
                onPress={() => handleEntryPress(item.id)}
                className="gap-4"
                style={{ backgroundColor: colors.card, borderColor: colors.border }}
              >
                <View className="flex-row justify-between items-start">
                  <View className="flex-row items-center gap-2">
                    <View className="w-8 h-8 rounded-full justify-center items-center" style={{ backgroundColor: colors.border }}>
                      {item.emoji || item.mood ? (
                        <Text style={{ fontSize: 16 }}>{item.emoji || item.mood}</Text>
                      ) : (
                        <Smile color={colors.text} size={14} />
                      )}
                    </View>
                    <Body style={{ color: colors.text, fontWeight: '500' }} numberOfLines={1}>
                      {item.title.substring(0, 20)}...
                    </Body>
                  </View>
                  <TouchableOpacity onPress={() => handleRemoveEntry(item.id)}>
                    <Trash2 color={colors.subtext} size={16} />
                  </TouchableOpacity>
                </View>
                
                <Body numberOfLines={2} style={{ color: colors.text }}>
                  {item.body}
                </Body>

                {item.imageUri && (
                  <View className="h-40 w-full rounded-lg overflow-hidden">
                    <Image 
                      source={{ uri: item.imageUri }} 
                      className="w-full h-full" 
                      resizeMode="cover"
                    />
                  </View>
                )}

                {item.audioUri && (
                  <AudioPlayer uri={item.audioUri} />
                )}

                <View className="flex-row gap-2">
                  <View className="px-2 py-0.5 rounded-lg border" style={{ backgroundColor: colors.card, borderColor: colors.border }}>
                    <Caption style={{ color: colors.text }}>{item.date}</Caption>
                  </View>
                </View>
              </Card>
            </AnimatedEntry>
          </View>
        )}
      />
    </ScreenContainer>
  );
}
