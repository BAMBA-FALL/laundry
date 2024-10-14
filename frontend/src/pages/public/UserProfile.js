import React from 'react';
import { Tabs } from 'antd';
import PersonalInfo from './PersonalInfos';
import AppointmentSection from './AppointmentSection';
import LaundryStatus from './LaundryStatus';

const { TabPane } = Tabs;

// Composant principal UserProfile avec les onglets
const UserProfile = () => {
  return (
    <div style={{ padding: '20px' }}>
      <Tabs defaultActiveKey="1" centered>
        <TabPane tab="Informations personnelles" key="1">
          <PersonalInfo />
        </TabPane>

        <TabPane tab="Prendre un rendez-vous" key="2">
          <AppointmentSection />
        </TabPane>

        <TabPane tab="Linge en cours" key="3">
          <LaundryStatus />
        </TabPane>
      </Tabs>
    </div>
  );
};

export default UserProfile;
