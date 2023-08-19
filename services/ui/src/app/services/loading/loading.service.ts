import {EventEmitter, Injectable, Output} from '@angular/core';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  @Output() isLoading = new EventEmitter<boolean>();
  @Output() isLoadingMap = new EventEmitter<Map<string, boolean>>();

  private readonly loadingMap = new Map<string, boolean>();

  constructor() { }

  public isLoadingObservable(): Observable<boolean> {
    return this.isLoading;
  }

  public isLoadingMapObservable(): Observable<Map<string, boolean>> {
    return this.isLoadingMap;
  }

  public onLoadingStart() {
    this.isLoading.next(true);
  }

  public onKeyLoadingStart(key: string) {
    this.loadingMap.set(key, true);
    this.isLoadingMap.next(this.loadingMap);
  }

  public onKeyLoadingFinished(key: string) {
    this.loadingMap.set(key, false);
    this.isLoadingMap.next(this.loadingMap);
    this.loadingMap.delete(key);
  }

  public onLoadingFinished() {
    this.isLoading.next(false);
  }
}
