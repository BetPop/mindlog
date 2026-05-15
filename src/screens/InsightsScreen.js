import React, { useState, useCallback } from 'react';
import { View, TouchableOpacity, ScrollView, Text, Modal, TouchableWithoutFeedback } from 'react-native';
import { Flame, ChevronDown, ChevronRight } from 'lucide-react-native';
import ScreenContainer from '../components/ScreenContainer';
import AppHeader from '../components/AppHeader';
import Card from '../components/Card';
import { Heading, Body, Caption, Subheading } from '../components/Typography';
import { useTheme } from '../context/ThemeContext';

const FILTERS = [
  { id: '7d', label: 'Last 7 days', data: [60, 40, 80, 50, 90, 70, 95], labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'] },
  { id: '1m', label: 'Last Month', data: [40, 50, 30, 70, 85, 60, 45, 90, 100, 80], labels: ['W1', 'W2', 'W3', 'W4'] },
  { id: '3m', label: '3 Months', data: [75, 80, 65], labels: ['Mar', 'Apr', 'May'] },
  { id: '1y', label: 'Year', data: [70, 65, 80, 75, 90, 85, 80, 70, 60, 75, 85, 90], labels: ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'] },
];

export default function InsightsScreen() {
  const { theme, colors } = useTheme();
  const [activeFilter, setActiveFilter] = useState(FILTERS[0]);
  const [showFilterModal, setShowFilterModal] = useState(false);

  console.log('InsightsScreen rendered');

  const toggleModal = useCallback(() => {
    setShowFilterModal(prev => !prev);
  }, []);

  const selectFilter = useCallback((filter) => {
    setActiveFilter(filter);
    setShowFilterModal(false);
  }, []);

  return (
    <ScreenContainer padding={false} scrollable={false} backgroundColor={colors.background}>
      {/* Header */}
      <View className="px-6">
        <AppHeader title="Insights" />
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 20 }} showsVerticalScrollIndicator={false}>
        {/* Streak Card */}
        <View className="px-6 pt-6 pb-4">
          <View 
            className="py-8 px-6 rounded-2xl items-center gap-3" 
            style={{ backgroundColor: theme === 'light' ? '#2c2926' : '#000000' }}
          >
            <View className="flex-row justify-center items-center gap-3">
              <Flame color="#fcfbfa" size={28} />
              <Heading className="text-5xl leading-[60px]" style={{ color: '#fcfbfa' }}>12</Heading>
            </View>
            <View className="items-center gap-1">
              <Body style={{ color: '#fcfbfa', fontWeight: '600' }}>Day Streak</Body>
              <Caption style={{ color: '#cbc5bf' }}>Keep it going!</Caption>
            </View>
          </View>
        </View>

        {/* Mood Trend */}
        <View className="px-6 pb-6 gap-4">
          <View className="flex-row justify-between items-center">
            <Body style={{ color: colors.text }}>Mood Trend</Body>
            <TouchableOpacity 
              className="flex-row items-center gap-2"
              onPress={toggleModal}
            >
              <Caption style={{ color: colors.subtext }}>{activeFilter.label}</Caption>
              <ChevronDown color={colors.subtext} size={14} />
            </TouchableOpacity>
          </View>

          <Card className="h-64 p-6 justify-end" style={{ backgroundColor: colors.card, borderColor: colors.border }}>
            <View className="flex-row items-end gap-2 h-full">
              {/* Y-Axis */}
              <View className="w-8 h-full pt-2 pb-6 justify-between items-start">
                <Caption>😊</Caption>
                <Caption>😐</Caption>
                <Caption>😔</Caption>
              </View>

              {/* Chart Columns */}
              <View className="flex-1 flex-row justify-between items-end h-full">
                {activeFilter.data.map((val, i) => {
                  const label = activeFilter.labels[i % activeFilter.labels.length];
                  return (
                    <View key={i} className="flex-col justify-end items-center gap-2 flex-1 h-full">
                      <View 
                        className="w-full rounded-t-sm" 
                        style={{ 
                          height: `${val * 0.75}%`, // Scale down to ensure it doesn't hit the top
                          backgroundColor: i === activeFilter.data.length - 1 ? colors.text : colors.border,
                          maxWidth: 30
                        }} 
                      />
                      <Caption 
                        className="leading-3 text-[10px]" 
                        style={{ color: colors.subtext }}
                        numberOfLines={1}
                      >
                        {label}
                      </Caption>
                    </View>
                  );
                })}
              </View>
            </View>
          </Card>

          {/* Stats Row */}
          <View className="flex-row gap-3">
            <Card className="flex-1 p-3 items-center gap-1" style={{ backgroundColor: colors.card, borderColor: colors.border }}>
              <Heading className="text-xl leading-7" style={{ color: colors.text }}>😊</Heading>
              <Caption className="text-center" style={{ color: colors.subtext }}>Most{'\n'}Common</Caption>
            </Card>
            <Card className="flex-1 p-3 items-center gap-1" style={{ backgroundColor: colors.card, borderColor: colors.border }}>
              <Heading className="text-xl leading-7" style={{ color: colors.text }}>4.2</Heading>
              <Caption className="text-center" style={{ color: colors.subtext }}>Avg. Rating</Caption>
            </Card>
            <Card className="flex-1 p-3 items-center gap-1" style={{ backgroundColor: colors.card, borderColor: colors.border }}>
              <Heading className="text-xl leading-7" style={{ color: colors.text }}>28</Heading>
              <Caption className="text-center" style={{ color: colors.subtext }}>Entries</Caption>
            </Card>
          </View>
        </View>

        {/* Top Tags */}
        <View className="px-6 pb-6 gap-4">
          <Subheading className="text-sm" style={{ color: colors.text }}>Top Tags</Subheading>
          
          <View className="gap-3">
            {[
              { rank: 1, name: 'Work', count: 42, color: colors.text, text: colors.background },
              { rank: 2, name: 'Exercise', count: 28, color: colors.border, text: colors.text },
              { rank: 3, name: 'Friends', count: 22, color: colors.border, text: colors.text },
              { rank: 4, name: 'Gratitude', count: 18, color: colors.border, text: colors.text },
              { rank: 5, name: 'Stress', count: 15, color: colors.border, text: colors.text },
            ].map((tag, i) => (
              <Card key={i} className="flex-row justify-between items-center" style={{ backgroundColor: colors.card, borderColor: colors.border }}>
                <View className="flex-row items-center gap-4">
                  <View className="w-8 h-8 rounded-lg justify-center items-center" style={{ backgroundColor: tag.color }}>
                    <Body className="text-sm leading-5" style={{ color: tag.text }}>{tag.rank}</Body>
                  </View>
                  <View>
                    <Body style={{ color: colors.text }}>{tag.name}</Body>
                    <Caption className="leading-3" style={{ color: colors.subtext }}>{tag.count} entries</Caption>
                  </View>
                </View>
                <ChevronRight color={colors.text} size={20} />
              </Card>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Filter Modal */}
      <Modal
        visible={showFilterModal}
        transparent
        animationType="fade"
        onRequestClose={toggleModal}
      >
        <TouchableWithoutFeedback onPress={toggleModal}>
          <View className="flex-1 justify-center items-center px-6" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <TouchableWithoutFeedback>
              <View className="w-full rounded-2xl overflow-hidden" style={{ backgroundColor: colors.card }}>
                <View className="p-4 border-b" style={{ borderBottomColor: colors.border }}>
                  <Subheading style={{ color: colors.text }}>Select Period</Subheading>
                </View>
                {FILTERS.map((f) => (
                  <TouchableOpacity
                    key={f.id}
                    className="p-5 flex-row justify-between items-center"
                    onPress={() => selectFilter(f)}
                  >
                    <Body style={{ color: colors.text, fontWeight: activeFilter.id === f.id ? '600' : '400' }}>
                      {f.label}
                    </Body>
                    {activeFilter.id === f.id && <View className="w-2 h-2 rounded-full" style={{ backgroundColor: colors.text }} />}
                  </TouchableOpacity>
                ))}
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </ScreenContainer>
  );
}
