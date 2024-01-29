import { Injectable } from '@nestjs/common';

@Injectable()
export class TimeService {
  private currentDate = new Date();

  private formatDate(date: Date): string {
    return date.toISOString().replace(/T.*/, '');
  }

  getLast30Days(): string {
    const dateCopy = new Date(this.currentDate.getTime());

    const pastDay = new Date(
      dateCopy.getFullYear(),
      dateCopy.getMonth(),
      dateCopy.getDate() - 30,
    );

    return `${this.formatDate(pastDay)},${this.formatDate(this.currentDate)}`;
  }

  getThisWeek(): string {
    const previousMonday = new Date();

    previousMonday.setDate(
      this.currentDate.getDate() - ((this.currentDate.getDay() + 6) % 7),
    );

    const thisSunday = new Date(
      previousMonday.getFullYear(),
      previousMonday.getMonth(),
      previousMonday.getDate() + 7,
    );

    return `${this.formatDate(previousMonday)},${this.formatDate(thisSunday)}`;
  }

  getNextWeek(): string {
    const dateCopy = new Date(this.currentDate.getTime());

    const nextMonday = new Date(
      dateCopy.setDate(
        dateCopy.getDate() + ((7 - dateCopy.getDay() + 1) % 7 || 7),
      ),
    );

    const nextSunday = new Date(
      nextMonday.getFullYear(),
      nextMonday.getMonth(),
      nextMonday.getDate() + 7,
    );

    return `${this.formatDate(nextMonday)},${this.formatDate(nextSunday)}`;
  }
}
