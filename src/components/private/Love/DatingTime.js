import React, {useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import moment from 'moment';
import {RNText} from 'components/common';

const DatingTime = ({
  title,
  date = Date.now(),
  style,
  isCountAutomatically,
}) => {
  const [realTime, setRealTime] = useState(Date.now());

  useEffect(() => {
    if (isCountAutomatically) {
      const interval = setInterval(() => {
        setRealTime(Date.now());
      }, 1000);
      return () => {
        clearInterval(interval);
      };
    }
  }, [isCountAutomatically]);

  return (
    <View style={style}>
      <RNText style={styles.datingTitle} font="regular">
        {title}
      </RNText>
      <View style={styles.datingTimeContainer}>
        <RNText style={styles.timeText} font="medium">
          {moment(isCountAutomatically ? realTime : date).format('DD/MM/YYYY')}
        </RNText>
        <RNText style={styles.timeText} font="medium">
          {isCountAutomatically
            ? moment(realTime).format('HH:mm:ss')
            : moment(date).startOf('date').format('HH:mm:ss')}
        </RNText>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  datingTitle: {
    fontSize: 16,
    textAlign: 'center',
    paddingBottom: 15,
  },
  datingTimeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  timeText: {
    fontSize: 20,
  },
});

export default DatingTime;
