import { Component, OnInit } from '@angular/core';
import { EmpFetchService } from '../emp-fetch.service';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Emp } from '../emp.model';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})

export class EmployeeComponent implements OnInit {

  candidates: any[];
  masterCandidates:any[];
  searchWord :string="";
  prevEdited: any[];
  popup: boolean = false;
  deleteObject:any;
  errorMessage: String;

  constructor(private api: EmpFetchService,private http: HttpClient) { }

  ngOnInit() {
    this.showConfig();
  }

  edit(candObj:any){
    if(this.prevEdited == undefined){
      this.prevEdited = candObj;
    }
    else{
      this.candidates[this.candidates.indexOf(this.prevEdited)].editable =false;
      this.prevEdited = candObj;
    }
    candObj.editable = true;
  }

  cancel(candidate){
    candidate.editable =false; 
    this.errorMessage ='';
    if(candidate.id==0){
      this.candidates.splice(0,1);
    }
  }

  delete(canDelete){
    //if(confirm('Do you want to delete '))
    if(!canDelete)
    {
      this.deleteObject=[];
      this.popup=false;
    }
    let id = this.deleteObject;
    this.api.deleteConfig(id).subscribe((data)=>{
      if(data)
      {
        this.showConfig();
        this.deleteObject=[];
        this.popup=false;
      }
    });
  }

  deleteQuestion(obj:any)
  {
    this.deleteObject=obj;
    this.popup=true;
  }

  update(candidate:any){
    this.errorMessage ='';
    for (var item in candidate) {
      if(candidate[item] == '' && item != 'id'){
        this.errorMessage += item+" ,";
      }
    }
    if(this.errorMessage!='')
    {
      this.errorMessage = 'Please Enter : '+this.errorMessage.substr(0,this.errorMessage.length-2);
      return;
    }

    if(candidate.id==0)
    {
      let maxId:number=0;
      this.candidates.forEach(function(candid){
          if(+candid.id > maxId)
            maxId = +candid.id;
      });
      candidate.id =maxId+1;
    }
    candidate.editable =false;
    this.api.updateConfig(JSON.stringify(candidate)).subscribe(
      sv => console.log(sv)
    );

  }

  addNew()
  {
    if(this.candidates[0].id==0)
      return;
    let emp:any = {};
    emp.id =0;
    emp.name="";
    emp.email="";
    emp.desig ="";
    emp.contact="";
    emp.company ="";
    emp.editable =true;
    this.candidates.unshift(emp);
  }

  showConfig() {

    this.api.getConfig().subscribe((data:any) => {
      this.searchWord="";
      if(this.masterCandidates ==undefined || this.masterCandidates.length==0)
        this.masterCandidates = data['candidates'];
      this.candidates = data['candidates'];
    });
  }

  filter()
  {
    this.candidates =[];
    this.masterCandidates.forEach(element => {
      if(element.name.indexOf(this.searchWord)>-1 || element.email.indexOf(this.searchWord)>-1 || element.company.indexOf(this.searchWord)>-1
     || element.contact.indexOf(this.searchWord)>-1 || element.desig.indexOf(this.searchWord)>-1)
        this.candidates.push(element);
    });
  }

}
