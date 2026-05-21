import React, { useState, useMemo, useEffect } from 'react';
import { View, TouchableOpacity, ScrollView, Text, Image } from 'react-native';
import { Plus, ChevronLeft, ChevronRight } from 'lucide-react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import ScreenContainer from '../components/ScreenContainer';
import AppHeader from '../components/AppHeader';
import Button from '../components/Button';
import Card from '../components/Card';
import { Body, Subheading, Caption } from '../components/Typography';
import { SCREENS } from '../constants/screens';
import { useTheme } from '../context/ThemeContext';
import { useSelector } from 'react-redux';
import AudioPlayer from '../components/AudioPlayer';



export default function CalendarScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { theme, colors } = useTheme();
  
  // Initialize with today's date if no params
  const initialDate = new Date();
  
  // State for the month we are viewing
  const [viewDate, setViewDate] = useState(new Date(initialDate.getFullYear(), initialDate.getMonth(), 1));
  // State for the day selected in the grid
  const [selectedDate, setSelectedDate] = useState(initialDate);

  useEffect(() => {
    if (route.params?.date) {
      const passedDate = new Date(route.params.date);
      // Valid date check
      if (!isNaN(passedDate.getTime())) {
        setViewDate(new Date(passedDate.getFullYear(), passedDate.getMonth(), 1));
        setSelectedDate(passedDate);
      }
    }
  }, [route.params?.date]);

  const weekdays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  // Helper to format date as YYYY-MM-DD for data lookup
  const formatDateKey = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const allEntries = useSelector(state => state.entries.list);
  
  const entriesByDate = useMemo(() => {
    const grouped = {};
    allEntries.forEach(entry => {
      // Safely default to a standard date format if missing
      const dateKey = entry.date || '2025-04-15'; 
      if (!grouped[dateKey]) grouped[dateKey] = [];
      grouped[dateKey].push(entry);
    });
    return grouped;
  }, [allEntries]);

  const selectedDateKey = formatDateKey(selectedDate);
  const currentEntries = entriesByDate[selectedDateKey] || [];

  // Generate the calendar grid for the current viewDate
  const calendarDays = useMemo(() => {
    const year = viewDate.getFullYear();
    const month = viewDate.getMonth();
    
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    // Previous month's trailing days
    const prevMonthLastDay = new Date(year, month, 0).getDate();
    const prevMonthDays = [];
    for (let i = firstDayOfMonth - 1; i >= 0; i--) {
      prevMonthDays.push({
        day: prevMonthLastDay - i,
        date: new Date(year, month - 1, prevMonthLastDay - i),
        current: false
      });
    }
    
    // Current month's days
    const currentMonthDays = [];
    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(year, month, i);
      currentMonthDays.push({
        day: i,
        date: date,
        current: true,
        dot: entriesByDate[formatDateKey(date)] !== undefined
      });
    }
    
    // Next month's leading days to fill the grid (total 42 cells for 6 rows)
    const nextMonthDays = [];
    const remainingCells = 42 - (prevMonthDays.length + currentMonthDays.length);
    for (let i = 1; i <= remainingCells; i++) {
      nextMonthDays.push({
        day: i,
        date: new Date(year, month + 1, i),
        current: false
      });
    }
    
    return [...prevMonthDays, ...currentMonthDays, ...nextMonthDays];
  }, [viewDate]);

  const changeMonth = (offset) => {
    setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + offset, 1));
  };

  const isSelected = (date) => {
    return date.getFullYear() === selectedDate.getFullYear() &&
           date.getMonth() === selectedDate.getMonth() &&
           date.getDate() === selectedDate.getDate();
  };

  return (
    <ScreenContainer padding={false} scrollable={false} backgroundColor={colors.background}>
      {/* Header */}
      <View className="px-6">
        <AppHeader 
          title="Calendar" 
          rightComponent={
            <Button 
              icon={Plus}
              className="w-10 h-10 px-0"
              onPress={() => navigation.navigate(SCREENS.NEW_ENTRY, { date: selectedDate.toISOString() })}
            />
          }
        />
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 40 }} showsVerticalScrollIndicator={false}>
        {/* Calendar Widget */}
        <View className="flex-col">
          {/* Month Header */}
          <View className="px-6 pt-6 pb-4 flex-row justify-between items-center">
            <TouchableOpacity 
              onPress={() => changeMonth(-1)}
              className="w-10 h-10 rounded-xl justify-center items-center"
            >
              <ChevronLeft color={colors.text} size={24} />
            </TouchableOpacity>
            <Subheading className="text-lg" style={{ color: colors.text }}>
              {monthNames[viewDate.getMonth()]} {viewDate.getFullYear()}
            </Subheading>
            <TouchableOpacity 
              onPress={() => changeMonth(1)}
              className="w-10 h-10 rounded-xl justify-center items-center"
            >
              <ChevronRight color={colors.text} size={24} />
            </TouchableOpacity>
          </View>

          {/* Grid */}
          <View className="px-6 pb-6 gap-2 items-center">
            {/* Weekdays */}
            <View className="flex-row justify-between w-[318px] px-1">
              {weekdays.map((d, i) => (
                <View key={i} className="w-[42px] py-2 items-center">
                  <Body style={{ color: colors.subtext }}>{d}</Body>
                </View>
              ))}
            </View>

            {/* Days */}
            <View className="flex-row flex-wrap justify-start w-[318px] gap-0">
              {calendarDays.map((item, i) => {
                const active = isSelected(item.date);
                const hasEntry = item.dot;
                return (
                  <TouchableOpacity 
                    key={i} 
                    onPress={() => setSelectedDate(item.date)}
                    className={`w-[45px] h-[45px] justify-center items-center rounded-lg ${active ? '' : ''}`}
                    style={{ backgroundColor: active ? colors.text : 'transparent' }}
                  >
                    <Body 
                      style={{ 
                        color: active 
                          ? colors.background 
                          : item.current 
                            ? colors.text 
                            : colors.border // Dimmed color for non-current month
                      }}
                    >
                      {item.day}
                    </Body>
                    {hasEntry && (
                      <View 
                        className="w-1 h-1 rounded-full absolute bottom-1" 
                        style={{ backgroundColor: active ? colors.background : colors.text }} 
                      />
                    )}
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        </View>

        {/* Entries List */}
        <View className="px-6 pb-6 gap-4">
          <View className="flex-row justify-between items-center">
            <Body className="font-medium" style={{ color: colors.text }}>
              {selectedDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
            </Body>
            <Caption style={{ color: colors.subtext }}>{currentEntries.length} entries</Caption>
          </View>

          <View className="gap-3">
            {currentEntries.length > 0 ? (
              currentEntries.map(entry => (
                <Card 
                  key={entry.id}
                  onPress={() => navigation.navigate(SCREENS.ENTRY_DETAIL, { id: entry.id })}
                  className="flex-row gap-3"
                  style={{ backgroundColor: colors.card, borderColor: colors.border }}
                >
                  <Text className="text-2xl">{entry.emoji}</Text>
                  <View className="flex-1 gap-2">
                    <Caption className="leading-3" style={{ color: colors.subtext }}>{entry.time}</Caption>
                    <Body style={{ color: colors.text }}>
                      {entry.text || entry.body}
                    </Body>
                    
                    {entry.imageUri && (
                      <View className="h-32 w-full rounded-lg overflow-hidden mt-1">
                        <Image 
                          source={{ uri: entry.imageUri }} 
                          className="w-full h-full" 
                          resizeMode="cover"
                        />
                      </View>
                    )}

                    {entry.audioUri && (
                      <View className="mt-1">
                        <AudioPlayer uri={entry.audioUri} />
                      </View>
                    )}

                    {entry.tags && entry.tags.length > 0 && (
                      <View className="flex-row flex-wrap gap-1.5 mt-1">
                        {entry.tags.map(tag => (
                          <View key={tag} className="px-2 py-0.5 rounded-lg border" style={{ backgroundColor: colors.background, borderColor: colors.border }}>
                            <Caption style={{ color: colors.text }}>{tag}</Caption>
                          </View>
                        ))}
                      </View>
                    )}
                  </View>
                </Card>
              ))
            ) : (
              <View 
                className="py-10 items-center justify-center rounded-lg border border-dashed"
                style={{ backgroundColor: colors.card, borderColor: colors.border }}
              >
                <Body style={{ color: colors.subtext }}>No entries for this day</Body>
              </View>
            )}
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}