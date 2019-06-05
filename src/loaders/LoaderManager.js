import Vue from "vue";

import { Events } from "../constants";

import models from "../models";

export default class LoaderManager {
  constructor() {
    this._name = "LoaderManager";

    this._bus = new Vue().$bus;

    this._progress = [];

    this._loaders = {
      fbx: new THREE.FBXLoader(),

      prj: new THREE.FBXLoader(),

      json: new createjs.LoadQueue(true),

      locale: new createjs.LoadQueue(true),

      assets: new createjs.LoadQueue(true)
    };
  }

  load(manifest) {
    this.updateProgress();

    this.loadLocale(manifest.locale, localeres => {
      this._bus.emit(Events.LOCALE, localeres.locale);

      this.loadJson(manifest.json, jsonres => {
        this.loadAssets(manifest.assets, assetsres => {
          this._bus.emit(Events.LOADED, {
            projects: jsonres.projects,

            // partners: jsonres.partners,

            assets: assetsres
          });
          // this.loadProjects(jsonres.projects, prjsres => {
          //   // this.loadFbx(manifest.fbxs, fbxsres => {
          //   //   models.fbxs = fbxsres;

          //   // });
          //   // models.prjs = prjsres;

          // });
        });
      });
    });
  }

  loadLocale(manifest, callback) {
    let loader = this._loaders.locale;

    loader.on("complete", event => {
      let response = {};

      response.locale = loader.getResult("locale");

      callback(response);
    });

    loader.loadManifest(manifest);
  }

  loadJson(manifest, callback) {
    let loader = this._loaders.json;

    loader.on("complete", event => {
      let response = {};

      (response.projects = loader.getResult("projects")),
        (response.partners = loader.getResult("partners"));

      callback(response);
    });

    loader.on("progress", event => {
      this._progress[0] = event.progress;

      this.updateProgress();
    });

    loader.loadManifest(manifest);
  }

  loadAssets(manifest, callback) {
    let loader = this._loaders.assets;

    loader.on("complete", event => {
      let response = {};

      for (let i = manifest.length - 1; i >= 0; i--) {
        let item = manifest[i];

        response[item.id] = loader.getResult(item.id);
      }

      callback(response);
    });

    loader.on("progress", event => {
      this._progress[1] = event.progress;

      this.updateProgress();
    });

    loader.loadManifest(manifest);
  }

  loadProjects(collection, callback) {
    console.log("-coll--", collection);
    let loader = this._loaders.prj;
    let scope = this;
    let count = 0;
    let prjsProgress = [];
    let manifest = [];
    let response = [];
    let length = 0;

    for (let model of collection) {
      // collection | JSON.parse( collection )

      manifest.push(model.threefile);
    }

    length = manifest.length;

    function preload() {
      loader.load(
        manifest[count],
        group => {
          let mesh = group.children[0].clone();
          let attrs = mesh.geometry.attributes;
          let index = count;

          response.push({ attrs, index });

          ++count;

          if (count < length) preload();
          else callback(response);
        },
        event => {
          let progress = 0;

          prjsProgress[count] = event.loaded / event.total;

          for (let value of prjsProgress) {
            progress += value;
          }

          progress /= length;

          scope._progress[2] = progress;

          scope.updateProgress();
        }
      );
    }

    preload();
  }

  loadFbx(manifest, callback) {
    let loader = this._loaders.fbx;
    let scope = this;
    let count = 0;
    let length = manifest.length;
    let fbxsProgress = [];
    let response = [];

    function preload() {
      loader.load(
        manifest[count].src,
        group => {
          let mesh = group.children[0].clone();
          let attrs = mesh.geometry.attributes;
          let index = count;

          response.push({ attrs, index });

          ++count;

          if (count < length) preload();
          else callback(response);
        },
        event => {
          let progress = 0;

          fbxsProgress[count] = event.loaded / event.total;

          for (let value of fbxsProgress) {
            progress += value;
          }

          progress /= length;

          scope._progress[3] = progress;

          scope.updateProgress();
        }
      );
    }

    preload();
  }

  updateProgress() {
    let progress = 0;

    for (let value of this._progress) {
      progress += value;
    }

    progress /= 2;

    this._bus.emit(Events.PROGRESS, progress);
  }

  get bus() {
    return this._bus;
  }
}
