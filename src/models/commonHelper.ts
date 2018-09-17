
import { Injectable } from "@angular/core";
import { AlertController, ToastController, Toast, Loading, LoadingController } from "ionic-angular";
import { FormGroup } from "../../node_modules/@angular/forms";

@Injectable()
export class CommonHelper{

    totas : Toast;
    loading: Loading
    /**
     *
     */
    constructor(private totastCtrl: ToastController,  private loadingCtrl: LoadingController) {
    }
 
/**
 * 显示toast
 * @param message 提示信息
 * @param duration 显示时间
 * @param position 显示位置，接受值 "top", "middle", "bottom"
 * @param showCloseButton 是否显示关闭按钮
 */
public presentToast (message : string = '操作完成', duration : number = 2000, position : string = 'middle', showCloseButton: boolean = false){
    this.totas && this.totas.dismiss();
    this.totas = this.totastCtrl.create({
      message,
      duration,
      position,
      showCloseButton
    });
    this.totas.present();
}

/**
 * 弹出loading
 * @param content 显示内容
 */
public presentLoading(content?: string){
    this.loading = this.loadingCtrl.create({
        spinner: 'hide',
        content: `
        <div class="sk-folding-cube">
        <div class="sk-cube1 sk-cube"></div>
        <div class="sk-cube2 sk-cube"></div>
        <div class="sk-cube4 sk-cube"></div>
        <div class="sk-cube3 sk-cube"></div>
      </div>`,
    });
    this.loading.present();
}
/**
 * 关闭loading
 */
public dismissLoading(){
    this.loading && this.loading.dismiss();
}

/**
 * 表单值改变处理错误信息方法
 * @param RegisterForm
 * @param formErrors
 */
onInputValueChanged(RegisterForm: FormGroup,formErrors:any,validationMessages:any){

    if (!RegisterForm) {
      return;
    }
    const form = RegisterForm;
    for (const field in formErrors) {
      if (formErrors.hasOwnProperty(field)) {
        formErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const message = validationMessages[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key) && message[key]) {
              formErrors[field] += message[key];
            }
          }
        }
      }
    }
  }

  private time:boolean ;

  timeAdd(){
    this.time = true;
  }

  isTimetrue():boolean{
    return this.time;
  }  
}
