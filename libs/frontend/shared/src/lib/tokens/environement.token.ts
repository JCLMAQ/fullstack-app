import { InjectionToken } from '@angular/core';
import { Environment } from './environment.model';

export const ENVIRONMENT_TOKEN = new InjectionToken<Environment>('Environment');
