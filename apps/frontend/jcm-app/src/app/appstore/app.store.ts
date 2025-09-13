import { computed, inject } from '@angular/core';
import {
    signalStore,
    withComputed,
    withProps,
    withState
} from '@ngrx/signals';
// import { User } from '@prisma/prisma-client';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MessagesService } from '@fe/home';
import { AuthService } from '../features/auth/Services/auth.service';
import { DICTIONARIES_TOKEN } from '../tokens/dictionaries.token';
import { initialAppSlice } from './app.slice';
import { withAppAuthFeatures } from './authentication.features';
import { withDictionariesFeatures } from './dictionaries-feauture/dictionaries.features';

export const AppStore = signalStore(
  { providedIn: 'root' },
  withState(initialAppSlice),
  withProps(() => ({
        _messagesService: inject(MessagesService),
        _authService: inject(AuthService),
        _router: inject(Router),
        _snackbar: inject(MatSnackBar),
        _dictionaries: inject(DICTIONARIES_TOKEN)
            })),

  withComputed((store) => ({
    user: computed(() => store._authService.user()),
    authToken: computed(() => store._authService.authToken()),
  })),

  // Auth part
  withAppAuthFeatures(), // Add: login(), logout(), register()

 // Languages part
  withDictionariesFeatures() // Add  selectedLanguage, possibleLanguages, selectedDictionary, changeLanguage()

);
