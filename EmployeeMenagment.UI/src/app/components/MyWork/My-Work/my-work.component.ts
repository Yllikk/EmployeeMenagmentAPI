import { Component, OnInit } from '@angular/core';
//import { MatDialog } from '@angular/material/dialog';

import { ActivatedRoute, Route, Router, RouterLink } from '@angular/router';
import { WorkServicesService } from '../../../services/work-services.service';
import { UsersWork } from '../../../models/UsersWork.model';

@Component({
  selector: 'app-my-work',
  templateUrl: './my-work.component.html',
  styleUrl: './my-work.component.css'
})
export class MyWorkComponent implements OnInit{
  cards: any[] = [];  // This will hold your diagonal cards, for now an empty array
  workList: UsersWork[] = []
  idCard: number = 0;

  constructor(private Acrouter: ActivatedRoute,private route: Router,private WorkService: WorkServicesService) {   }

  ngOnInit(): void {
    let oki = sessionStorage.getItem('idCard')
    this.idCard = parseInt(oki || '',10);

    this.WorkService.GetAllUsersWork(this.idCard).subscribe({
      next: AllWorks =>{
        this.workList = AllWorks;
        this.addCard();
      }
    });
    
    

  }

  addCard(): void {

    this.workList.forEach(work =>{

      const newCard = { 
        //id: work.id,  // Auto increment the id
        title: work.workName,
        workID: work.id  // Marking this as a "diagonal" card
        
      };
      
      this.cards.push(newCard);  // Add the new card to the array
    });

  }

  // removeCard(): void {
  //   if (this.cards.length > 0) {
  //     const removedCard = this.cards.pop();  // Remove the last card from the array
  //     console.log('Card removed:', removedCard);
  //   } else {
  //     console.log('No cards to remove.');
  //   }
    
  // }


  NavigateToAddWorkComponent(): void{
    //this.route.navigate(['AdminHome',this.idCard,'My-Work','Add_Work']);
    const currentUrl = this.Acrouter.snapshot.url.join('/'); 
    const newPath = `${currentUrl}/Add_Work`;
    this.route.navigate([newPath]);
  }

  NavigateToEditWorkComponent(WorkId:number): void{
    // this.route.navigate(['AdminHome',this.idCard,'My-Work','Edit_Work',WorkId]);
    const currentUrl = this.Acrouter.snapshot.url.join('/'); 
    const newPath = `${currentUrl}/Edit_Work/${WorkId}`;
    this.route.navigate([newPath]);
  }

}
