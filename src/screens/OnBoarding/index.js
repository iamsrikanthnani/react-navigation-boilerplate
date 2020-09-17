import React from 'react';
import RNCCommon from '../../components/common';

const onBoardings = [
  {
    title: 'Welcome to SmartCare',
    description:
      'All your team communication in one place, instantly searchable',
    color: '#31b67d',
  },
  {
    title: 'Channels',
    description:
      'Talk with coworkers based on projects departments or shared interests',
    color: '#e21e5d',
  },
  {
    title: 'Direct Messages',
    description: 'Talk one-on-one with people in your company.',
    color: '#edb32e',
  },
];

const OnBoarding = ({navigation}) => {
  return (
    <RNCCommon.OnboardingAnimated
      screens={onBoardings}
      onComplete={() => alert('hihi')}
    />
  );
};

export default OnBoarding;
