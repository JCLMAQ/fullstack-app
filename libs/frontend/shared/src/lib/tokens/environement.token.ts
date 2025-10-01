import { InjectionToken } from '@angular/core';
import { Environment } from './environment.model';

export const ENVIRONMENTTOKEN = new InjectionToken<Environment>('Environment');
