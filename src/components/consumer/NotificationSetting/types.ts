export interface INotificationsAlert {
  notification_setting: INotificationSetting;
  newsletters: ICharityAlert[];
  charity_alerts: ICharityAlert[];
  deals_alerts: IDealsAlert[];
}

export interface ICharityAlert {
  id: number;
  charity_name: string;
}

export interface IDealsAlert {
  id: number;
  name: string;
}

export interface INotificationSetting {
  id?: number;
  user_id?: number;
  is_newsletter: number;
  is_deals: number;
  is_charity: number;
  is_volunteer_missions: number;
  created_at?: string;
  updated_at?: string;
}
