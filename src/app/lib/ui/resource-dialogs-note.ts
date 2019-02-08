/** Resource Dialog Components **
********************************/

import {Component, OnInit, Input, Inject} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

/** Resource Note Dialog Components **
********************************/

/********* ResourceNoteDialog **********
	data: {
        title: "<string>" title text,
        name: "<string>"resource name,
        description: "<string>"resource content,
        timestamp: "<string" resource timestamp
    }
***********************************/
@Component({
	selector: 'ap-resourcenotedialog',
	template: `
        <div class="_ap-resource">
            <div class="popover-title">
                <h1 mat-dialog-title >{{data.title}}</h1>
            </div>
            <mat-dialog-content>
                <div style="display:flex;">
                    <div>                          
                        <div style="padding-left: 10px;">
                            <div *ngIf="data.latitude" style="font-size: 10pt;">
                                <div style="display:flex;">
                                    <div style="width:45px;font-weight:bold;">Lat:</div>
                                    <div >{{data.latitude}}</div>
                                    &nbsp;
                                    <div style="width:45px;font-weight:bold;">Lng:</div>
                                    <div >{{data.longitude}}</div>
                                </div>    
                            </div>          
                        <div *ngFor="let r of data.description; let i=index;">
                           <div style="padding-top:5px;padding-bottom:5px;"> {{r[1].name}} &nbsp; {{r[1].timestamp}} </div>
                           <div [innerHTML]="r[1].description" ></div>
                           <hr>
                        </div>
                            
                        </div>                                
                    </div>                            
                </div>
            </mat-dialog-content>
            <mat-dialog-actions>
                <div style="text-align:center;width:100%;">
                   <button mat-raised-button color="primary" 
                        (click)="dialogRef.close({result:true, data: data})">
                        ADD
                    </button>
                    <button mat-raised-button (click)="dialogRef.close({result:false, data: data})">
                        CLOSE
                    </button>

                </div>					
            </mat-dialog-actions>
            <mat-dialog-content>
                <div >
                        <div style="padding-left: 10px;">
                           <div style="margin:20px 20px;padding:10px 10px;background-color:#f7f7f7;text-align:center;"> {{data.source}}  </div>
                        </div>
                </div>
            </mat-dialog-content>
        </div>	
    `,
    styles: [`  ._ap-resource {
                    font-family: arial;
                    min-width: 300px;
                }
                .ap-confirm-icon { 
                    min-width: 35px;
                    max-width: 35px;
                    color: darkorange;
                    text-align: left;                    
                }
                .ap-confirm-icon .mat-icon { 
                    font-size: 25pt;
                }
                 .mat-dialog-title {
                    padding: 2px 0 2px 5px;
                    display:flex;
                    background-color: #f7f7f7;
                    margin: 5px 5px 0px 0px;
                  }

                @media only screen
                and (min-device-width : 768px)
                and (max-device-width : 1024px),
                only screen	and (min-width : 800px) { 
                    .ap-confirm-icon {
                        min-width: 25%;
                        max-width: 25%;
                    }
                    .ap-confirm-icon .mat-icon { 
                        font-size: 40pt;
                    }                    
                }                 	
			`]
})
export class ResourceNoteDialog implements OnInit {
	public icon;

    constructor(
        public dialogRef: MatDialogRef<ResourceNoteDialog>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
	}
	
	//** lifecycle: events **
    ngOnInit() {
        this.data.description= this.data.description || '';
        this.data.title= this.data.title || '';
        this.data.position= this.data.position || 0;
        this.data.addMode= this.data.addMode || false;
        this.data.type= this.data.type || 'note';
        this.data.source= this.data.source || '';


    } 

}


/********* ResourceNoteInputDialog **********
	data: {
	    heading: "<string"> title for box
        title: "<string>" location,
        description: "<string>"note body,
        position: "<array"> lat/long
        uuid: "<string>" id of note. 
    }
***********************************/
@Component({
	selector: 'ap-resourcenotedialog',
	template: `
        <div class="_ap-resource">
            <div>
                <h1 mat-dialog-title>{{data.heading}}</h1>
            </div>
            <mat-dialog-content>
                <div style="display:flex;">
                    <div>                          
                        <div style="padding-left: 10px;">
                            <div>                                     
                                <mat-form-field style="width:500px;" >
                                    <input matInput #inpname="ngModel" 
                                        type="text" required
                                        placeholder="Location"
                                        [disabled]="data.show"
                                        [(ngModel)]="data.title">
                                    <mat-error *ngIf="inpname.invalid && (inpname.dirty || inpname.touched)">
                                        Please enter a location
                                    </mat-error>
                                </mat-form-field>
                            </div>
                            <div >
                                <mat-form-field style="width:500px;" hintLabel="Enter a Description">
                                    <textarea matInput rows="5" #inpcmt="ngModel"
                                        placeholder="Description"
                                        [(ngModel)]="data.description">
                                    </textarea>
                                </mat-form-field>
                            </div>
                            <div *ngIf="data.position[0]" style="font-size: 10pt;">
                                <div style="display:flex;">
                                    <div style="width:45px;font-weight:bold;">Lat:</div>
                                    <div style="flex: 1 1 auto;">{{data.position[1]}}</div>
                                </div>
                                <div style="display:flex;">
                                    <div style="width:45px;font-weight:bold;">Lng:</div>
                                    <div style="flex: 1 1 auto;">{{data.position[0]}}</div>
                                </div>    
                            </div>                        
                        </div>                                
                    </div>                            
                </div>
            </mat-dialog-content>
            <mat-dialog-actions>
                <div style="text-align:center;width:100%;">
                    <button mat-raised-button color="primary" 
                        [disabled]="inpname.invalid"
                        (click)="dialogRef.close({result:true, data: data})">
                        SAVE
                    </button>
                    <button mat-raised-button (click)="dialogRef.close({result:false, data: data})">
                        CANCEL
                    </button>
                </div>					
            </mat-dialog-actions>
        </div>	
    `,
    styles: [`  ._ap-resource {
                    font-family: arial;
                    min-width: 300px;
                }
                .ap-confirm-icon { 
                    min-width: 35px;
                    max-width: 35px;
                    color: darkorange;
                    text-align: left;                    
                }
                .ap-confirm-icon .mat-icon { 
                    font-size: 25pt;
                }

                @media only screen
                and (min-device-width : 768px)
                and (max-device-width : 1024px),
                only screen	and (min-width : 800px) { 
                    .ap-confirm-icon {
                        min-width: 25%;
                        max-width: 25%;
                    }
                    .ap-confirm-icon .mat-icon { 
                        font-size: 40pt;
                    }                    
                }                 	
			`]
})
export class ResourceNoteInputDialog implements OnInit {
	public icon;

    constructor(
        public dialogRef: MatDialogRef<ResourceNoteInputDialog>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
	}
	
	//** lifecycle: events **
    ngOnInit() {
        this.data.heading= this.data.heading || '';
        this.data.title= this.data.title || '';
        this.data.description= this.data.description || '';
        this.data.position= this.data.position || [null,null];
        this.data.addMode= this.data.addMode || false;
        this.data.type= this.data.type || 'note';
        this.data.uuid= this.data.uuid || '0';
        this.data.show= this.data.show || false;

    } 

}
