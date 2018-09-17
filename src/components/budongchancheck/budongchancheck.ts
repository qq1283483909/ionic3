import { NG_VALUE_ACCESSOR, ControlValueAccessor, NgModel } from "@angular/forms";
import { Component, forwardRef, ViewChild, Input } from "@angular/core";
/**
 * 
 *  不动产权证、不动产证明证书 校验 组件
 * 
 * 
 */
@Component({
  selector: 'app-two-way',
  templateUrl: 'budongchancheck.html',

  styleUrls: [],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => TwoWayComponent),
    multi: true,
  }],


})
export class TwoWayComponent implements ControlValueAccessor {


  @Input() showyear:boolean = false;

  @Input() showbianhao:boolean = false;

  @Input() showzhenghao:boolean = false;
  innerValue: string = '';
  num: string= '';
  private onTouchedCallback: () => void ;
  private onChangeCallback: (_: any) => void ;
  @ViewChild('name1') name: NgModel;

  get number(): any{
    return this.num;
  }

  set number(v: any){
    if(v != this.num){
      this.num = v;
      this.onValueChange();
    }
  }

  get value(): any {
    return this.innerValue;
  };
 
  set value(v: any) {
    if (v !== this.innerValue) {
      this.innerValue = v;
      this.onValueChange();
    }
  }
 
  onValueChange(){
  if(this.name.invalid){  //验证条件不满足就不通知
    const res: string = `南宁${this.innerValue}不动产权证${this.num}号`;
    this.onChangeCallback(res);
  }

  }

  writeValue(value: any): void {
    if(!value) return;
    // 外面传进来的格式为    桂1233不动产123123号
    const arr =  <string[]>value.match(/\d+/g);
    this.innerValue = arr[0] || '';
    this.num = arr[1] || '';
    // if (value !== this.innerValue) {
    //   this.innerValue = value;
    // }
  }
 
  registerOnChange(fn: any): void {
    this.onChangeCallback = fn;
  }
 
  registerOnTouched(fn: any): void {
    this.onTouchedCallback = fn;
  }
}
