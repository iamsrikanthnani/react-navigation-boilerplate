import React, {useState, useEffect} from 'react';
import {StyleSheet} from 'react-native';
import moment from 'moment';
import 'moment-precise-range-plugin';
import {RNText} from 'components/common';

const TimeDistance = ({start, end = Date.now()}) => {
  const [distance, setDistance] = useState({
    years: 0,
    months: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    firstDateWasLater: false,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setDistance(moment.preciseDiff(start, end, true));
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  });

  const {years, months, days} = distance;

  return (
    <RNText style={styles.text} font="light">
      You've been together for{'  \n'}
      <RNText font="bold" style={styles.timeNumber}>
        {years}
      </RNText>
      {'  '}
      years
      {'  '}
      <RNText font="bold" style={styles.timeNumber}>
        {months}
      </RNText>
      {'   '}
      months
      {'  '}
      <RNText font="bold" style={styles.timeNumber}>
        {days}
      </RNText>
      {'   '}
      days
      {'\n\n'}Keep loving 🥳🥳🥳
    </RNText>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    textAlign: 'center',
    paddingVertical: 40,
    paddingHorizontal: 15,
    lineHeight: 24,
  },
  timeNumber: {
    fontSize: 20,
  },
});

export default TimeDistance;
