import { element } from 'protractor';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder } from '@angular/forms'

@Component({
  selector: 'app-rep-placeholder',
  templateUrl: './rep-placeholder.component.html',
  styleUrls: ['./rep-placeholder.component.css']
})
export class RepPlaceholderComponent implements OnInit {


  myForm: FormGroup;
  inText: string;
  outText: string;

  regEx = new RegExp("\{[a-zA-Z_][a-zA-Z0-9_]*\}");

  // constructor
  constructor(private _fb: FormBuilder) { }


  ngOnInit() {
    this.myForm = this._fb.group({
      'form_array': this._fb.array([
        this.initForm()
      ])
    });
  }

  /*
    Initializes my form groupe
  */
  initForm() {
    return this._fb.group({
      'token': [null, Validators.required],
      'replacement': [null, Validators.pattern("\{[a-zA-Z_][a-zA-Z0-9_]*\}")]
    });
  }

  /*
    Add new form groupe to form array
  */
  addNewItem() {
    const control = <FormArray>this.myForm.controls['form_array'];
    control.push(this.initForm());
  }

  /*
    Remove form groupe from form array
  */
  removeItem(i: number) {
    const control = <FormArray>this.myForm.controls['form_array'];
    if ((control.length - 1) >= 1) {
      control.removeAt(i);
    }
    this.readData();
  }

  /*
    Read data from form array inputs
  */
  readData(): any[] {
    const control = <FormArray>this.myForm.controls['form_array'];
    var tmp: any[] = [];

    control['controls'].forEach(inputObject => {
      tmp.push(inputObject.value);
    });

    return tmp;
  }

  /*
    The syntax of the placeholders match the following regular expression:
    \{[a-zA-Z_][a-zA-Z0-9_]*\}
    Syntactically invalid placeholders can be ignored
    Backslash („\“) is used as escape symbol for the placeholders
  */
  replacementText(inputObject: any, arrText: string[]): string[] {
    for (var i = 0; i < arrText.length; i++) {
      if (arrText[i].charAt(0) === '\\') {
        arrText[i] = arrText[i].replace(/^\\/g, "");
      } else if (inputObject.token === arrText[i] && this.regEx.test(inputObject.replacement)) {
        arrText[i] = inputObject.replacement;
      }
    }
    return arrText;
  }

  /*
    Replace input text with output text
  */  
  output(arrToken: any[], text: string) {
    if (text === null) {
      return;
    }
    var arrText = text.split(' ');
    var outArr = [];
    for (var j = 0; j < arrToken.length; j++) {
      var el = arrToken[j];
      outArr = this.replacementText(el, arrText);
    }
    this.outText = outArr.join(" ");
  }

  /*
    The function is called by focusout
  */
  load() {
    var dataFromForm = this.readData();
    this.output(dataFromForm, this.inText);
  }





}
