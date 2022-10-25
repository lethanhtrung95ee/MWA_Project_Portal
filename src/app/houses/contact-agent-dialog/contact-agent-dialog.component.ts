import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import ContactInformation from './IContactInformation.interface';

@Component({
  selector: 'app-contact-agent-dialog',
  templateUrl: './contact-agent-dialog.component.html',
  styleUrls: ['./contact-agent-dialog.component.css']
})
export class ContactAgentDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ContactAgentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public contactInfo: ContactInformation) {
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

}
