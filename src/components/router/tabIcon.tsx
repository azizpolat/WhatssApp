import React from 'react';

import {TabIconProps} from '../../models/ui/tabIconProps';
import {CALLS, CHATS, CONTACTS, SETTINGS, STATUS} from '../../utils/routes';

import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';

const TabIcons: React.FC<TabIconProps> = ({size, route, color}) => {
  switch (route?.name) {
    case STATUS:
      return <Ionicons name="logo-web-component" size={33} color={color} />;
    case CALLS:
      return <Ionicons name="call-outline" size={33} color={color} />;
    case CONTACTS:
      return <AntDesign name="contacts" size={33} color={color} />;
    case CHATS:
      return <Ionicons name="chatbubbles-outline" size={33} color={color} />;
    case SETTINGS:
      return <Ionicons name="settings-outline" size={33} color={color} />;
  }
};

export default TabIcons;
