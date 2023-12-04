"use client"
import { observer } from 'mobx-react-lite'
import { createContext, useContext } from "react"
import { observable, computed, action, flow, makeObservable, makeAutoObservable } from "mobx"
import { UserStore, userStore } from './user'
export class RootStore {
    userStore: UserStore
    constructor() {
        makeAutoObservable(this)
        this.userStore = userStore
    }





    //name space `module`_`property`
    _addURLDialog_open: boolean = false
    get addURLDialog_open() {
        return this._addURLDialog_open
    }
    /**
     * 更新addURLDialog的关闭
     * @param value 
     */
    update_addURLDialog_open(value: boolean) {
        this._addURLDialog_open = value
    }

    _categoryDialog_open: boolean = false
    get categoryDialog_open() {
        return this._categoryDialog_open
    }
    /**
     * 更新categoryDialog的关闭
     * @param value 
     */
    update_categoryDialog_open(value: boolean) {
        this._categoryDialog_open = value
    }
    _fullsScreenLoading_open: boolean = false
    get fullScreenLoading_open() {
        return this._fullsScreenLoading_open
    }
    /**
     * 更新全屏加载loading的关闭
     * @param value 
     */
    update_fullsScreenLoading_open(value: boolean) {
        this._fullsScreenLoading_open = value
    }

    _category_list: Array<string> = []
    get category_list() {
        return this._category_list
    }
    /**
     * 更新分类列表
     * @param value 
     */
    update_category_list(value: Array<string>) {
        this._category_list = value
    }

    _snackBar_open: boolean = false

    get snackBar_open() {
        return this._snackBar_open
    }
    /**
     * 更新分类列表
     * @param value 
     */
    update_snackBar_open(value: boolean) {
        this._snackBar_open = value
    }
}
export const rootStore = new RootStore()
export const StoreContext = createContext<RootStore>(rootStore)
