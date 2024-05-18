import {Component, ElementRef, forwardRef, Input, OnInit, ViewChild} from "@angular/core";
import {
  ControlValueAccessor,
  FormControl,
  FormGroup,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  Validators
} from "@angular/forms";

@Component({
  selector: 'vo-mat-fileUpload',
  templateUrl: './fileupload.component.html',
  styleUrls: ['./fileupload.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FileuploadComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => FileuploadComponent),
      multi: true
    }
  ]
})
export class FileuploadComponent implements ControlValueAccessor, OnInit{
  @Input() mode
  @Input() names
  @Input() url
  @Input() method
  @Input() multiple
  @Input() disabled
  @Input() accept = ".csv"
  @Input() maxFileSize
  @Input() auto = true
  @Input() chooseLabel = 'Choose'
  @Input() uploadLabel = 'Upload'
  @Input() cancelLabel = 'Cance'
  @Input() deleteButtonLabel
  @Input() deleteButtonIcon = 'close'
  @ViewChild('fileUpload')
  fileUpload: ElementRef
  @Input() files: File[] = []
  file: File | null = null;
  fileFormGroup: FormGroup;
  subscribers: any = {};

  constructor() {
    this.fileFormGroup = new FormGroup({
      fileStream: new FormControl({value: null, disabled: true}, [Validators.required])
    })
  }

  ngOnInit(): void {
    this.subscribers.filterForm = this.fileFormGroup.valueChanges
      .subscribe( (file) => {
        setTimeout(() => this.propagateChange(file))
      })
  }

  propagateChange = (_: any) => {
  };

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void {
  }

  writeValue(file): void {
    this.fileFormGroup.setValue(file != null ? file : new FileGroup(null))
  }


  onClick(event) {
    if (this.fileUpload)
      this.fileUpload.nativeElement.click()
  }

  onInput(event) {

  }

  onFileSelected(event) {
    let files = event.dataTransfer ? event.dataTransfer.files : event.target.files;
    for (let i = 0; i < files.length; i++) {
      let file = files[i];

      if (this.validate(file)) {
        const reader: FileReader = new FileReader();
        reader.onloadend = () => {
          const base64String: string = reader.result as string;
          const base64Data: string = base64String.split(',')[1]; // Remove the MIME type part
          this.fileFormGroup.get('fileStream')?.setValue(base64Data);
        };
        reader.readAsDataURL(file);
        this.files.push(files[i]);
      }
    }
  }

  removeFile(file) {
    let ix
    if (this.files && -1 !== (ix = this.files.indexOf(file))) {
      this.files.splice(ix, 1)
      this.fileFormGroup.get("fileStream")?.setValue(null)
    }
    this.fileUpload.nativeElement.value = '';
  }

  validate(file: File) {
    for (const f of this.files) {
      if (f.name === file.name
        && f.lastModified === file.lastModified
        && f.size === f.size
        && f.type === f.type
      ) {
        return false
      }
    }
    return true
  }

  setDisabledState(isDisabled: boolean) {

  }

}
export class FileGroup {
  fileStream: string | null

  constructor(fileStream: string | null) {
    this.fileStream = fileStream;
  }
}
