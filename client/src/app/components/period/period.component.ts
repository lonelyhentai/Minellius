import {Component, OnDestroy, OnInit} from '@angular/core';
import {MenuService} from '../../providers/menu.service';
import {Subscription} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {MenuComponentInterface} from '../../interfaces/menu-component.interface';
import * as dayjs from 'dayjs';

@Component({
  selector: 'app-period',
  templateUrl: './period.component.html',
  styleUrls: ['./period.component.scss']
})
export class PeriodComponent implements OnInit, OnDestroy, MenuComponentInterface {

  period: Date;

  menuItems: { name: string, path: string, icon: string }[] = [
    {
      name: 'REPO',
      path: 'repo',
      icon: 'database'
    },
    {
      name: 'USER',
      path: 'user',
      icon: 'user'
    },
    {
      name: 'ORG',
      path: 'org',
      icon: 'usergroup-add'
    }
  ];

  menuItem$: Subscription;
  currentMenuItemIndex: number;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly menuService: MenuService,
    private readonly router: Router
  ) {
    this.period = dayjs().toDate();
  }

  ngOnInit() {
    this.dateChangeTriggerRoute(this.period);
    this.menuService.subscribeMenuItemAutoUpdate(this, this.route);
  }

  ngOnDestroy(): void {
    this.menuService.unsubscribeMenuItemAutoUpdate(this);
  }

  dateChangeTriggerRoute(date) {
    this.router.navigate(['./'], {
      relativeTo: this.route, queryParams: {
        period: date,
      }
    });
  }
}
