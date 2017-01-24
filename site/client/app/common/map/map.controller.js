import L from 'leaflet';
import 'leaflet.markercluster';
import 'leaflet.markercluster.freezable';

L.Icon.Default.imagePath = 'leaflet/dist/images';

class MapController {
  constructor($timeout) {
    this.timeout = $timeout;
    this.clusters = {};
  }

  $onInit() {
    if (this.mapControl === undefined) {
      this.mapControl = {};
    }

    this.mapControl.addCircleMarker = this.addCircleMarker.bind(this);
    this.mapControl.addDivMarker = this.addDivMarker.bind(this);
    this.mapControl.divIcon = this.divIcon.bind(this);
    this.mapControl.addCluster = this.addCluster.bind(this);
    this.mapControl.addGeoJson = this.addGeoJson.bind(this);
    this.mapControl.showMarker = this.showMarker.bind(this);
    this.mapControl.removeMarker = this.removeMarker.bind(this);
  }

  $postLink() {
    this.timeout(() => {
      const opts = this.options;

      const center = [opts.lat, opts.long];

      this.map = L.map(opts.mapId).setView(center, opts.zoom);

      L.tileLayer(opts.url, {
        attribution: opts.attribution,
        minZoom: opts.minZoom,
        maxZoom: opts.maxZoom
      }).addTo(this.map);

      this.onLoad();
    });
  }

  showMarker(marker, cluster) {
    if (!marker.added) {
      marker.addTo(this._defineLayer(cluster));
      marker.added = true;
    }
  }

  removeMarker(marker, cluster) {
    if (marker.added) {
      marker.removeFrom(this._defineLayer(cluster));
      marker.added = false;
    }
  }

  addCircleMarker(lat, lng, opts = {}, radius = 4, cluster, add = true) {
    var marker = L.circleMarker([lat, lng], opts).setRadius(radius);
    if (add) {
      marker.added = true;
      return marker.addTo(this._defineLayer(cluster));
    } else {
      marker.added = false;
      return marker;
    }
  }

  addGeoJson(geojsonFeature, style) {
    let myStyle = {};
    Object.assign(myStyle, { color: "#ff7800", weight: 5, opacity: 0.65 }, style);

    const feature = L.geoJSON(geojsonFeature, {
      style: myStyle
    }).addTo(this.map);

    feature.geoJSON = geojsonFeature;
    feature.added = true;
    feature.hide = () => {
      if (feature.added) {
        feature.added = false;
        feature.removeFrom(this.map);
      }
    }
    feature.show = () => {
      if (!feature.added) {
        feature.added = true;
        feature.addTo(this.map);
      }
    }

    return feature;
  }

  addDivMarker(lat, lng, options, cluster, add = true) {
    var myIcon = this.divIcon(options);
    var marker = L.marker([lat, lng], { icon: myIcon });
    if (add) {
      marker.added = true;
      return marker.addTo(this._defineLayer(cluster));
    } else {
      marker.added = false;
      return marker
    }
  }

  divIcon(options) {
    return L.divIcon(options);;
  }

  addCluster(name, opts = {}) {
    if (!this.clusters[name]) {
      this.clusters[name] = L.markerClusterGroup(opts).addTo(this.map);
    }
    return this.clusters[name];
  }

  _defineLayer(clusterName) {
    if (clusterName && this.clusters[clusterName]) {
      return this.clusters[clusterName];
    } else {
      return this.map;
    }

  }
}

export default ['$timeout', MapController];
