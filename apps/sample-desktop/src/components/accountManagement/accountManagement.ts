import type { IconName } from '@template/ui';

export interface TransferMenuItem {
  title: string;
  description: string;
  icon: IconName;
  info: Array<{ icon: IconName; text: string }>;
  color: 'blue' | 'green' | 'red';
}
