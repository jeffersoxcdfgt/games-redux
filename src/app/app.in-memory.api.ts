import { InMemoryDbService } from 'angular-in-memory-web-api';

export class AppInMemoryApi  implements InMemoryDbService{
      createDb(){
        return {
          'games':[
            {
              'id':1,
              'gameName':'Game 1',
              'Assignee':'Jefferson Medina',
              'Priority':'Normal',
              'Deadline':'2019-10-10',
              'State':'Completed'
            },
            {
              'id':1,
              'gameName':'Game 1',
              'Assignee':'Jefferson Medina',
              'Priority':'Normal',
              'Deadline':'2019-10-10',
              'State':'Completed'
            },
            {
              'id':2,
              'gameName':'Game 2',
              'Assignee':'Diego Medina',
              'Priority':'Media',
              'Deadline':'2019-12-12',
              'State':'Pending'
            },
            {
              'id':3,
              'gameName':'Game 3',
              'Assignee':'Manuela Cedeño',
              'Priority':'Alta',
              'Deadline':'2019-04-03',
              'State':'Completed'
            },
            {
              'id':4,
              'gameName':'Game 4',
              'Assignee':'Johan Medina',
              'Priority':'Alta',
              'Deadline':'2019-05-03',
              'State':'Pending'
            }
          ]
        }
    }
}
