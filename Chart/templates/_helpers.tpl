{{- define "common_labels" -}}
{{- $top := index . 0 -}}
{{- $var := index . 1 -}}
app: {{ $top.Release.Name }}
component: {{ $var }}
{{- end -}}
