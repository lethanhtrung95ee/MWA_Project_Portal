import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import ContactInformation from './IContactInformation.interface';

@Component({
  selector: 'app-contact-agent-dialog',
  templateUrl: './contact-agent-dialog.component.html',
  styleUrls: ['./contact-agent-dialog.component.css'],
  encapsulation: ViewEncapsulation.Emulated
})
export class ContactAgentDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ContactAgentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public contactInfo: ContactInformation) { }

  onCancelClick(): void {
    this.dialogRef.close();
  }

}
