import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-warning-dialog',
  imports: [MatDialogActions, MatButtonModule],
  templateUrl: './warning-dialog.html',
  styleUrl: './warning-dialog.scss'
})
export class WarningDialog {
    data = inject(MAT_DIALOG_DATA) as {
      warning: string
      message: string
    };

    warningDialogRef = inject(MatDialogRef<WarningDialog>)

    onClose(accepted: boolean){
      this.warningDialogRef.close(accepted)
    }
}
