---
layout: page
title: Tags
permalink: /tags/
lang: zh-Hans
navbar_title: tags
---



<!--
<ul class="tags">
    {% for tag in site.tags %}
    <li>
        <a href="#{{ tag[0] }}">{{ tag[0] }}</a> <sup>{{ tag[1].size }}</sup>
    </li>
    {% endfor %}
</ul>

<ul class="listing">
    {% for tag in site.tags %}
    <li class="listing-seperator" id="{{ tag[0] }}">{{ tag[0] }}</li>
    {% for post in tag[1] %}
    <li class="listing-item">
        <time datetime="{{ post.date | date:"%Y-%m-%d" }}">{{ post.date | date:"%Y-%m-%d" }}</time>
        <a href="{{ post.url }}" title="{{ post.title }}">{{ post.title }}</a>
    </li>
    {% endfor %}
{% endfor %}
</ul>
-->

{%- if site.posts.size > 0 -%}

  {%- include functions.html func='log' level='debug' msg='Get tags value' -%}
  {%- include functions.html func='get_tags' -%}
  {% assign tags = return %}

  {% assign keys = tags %}
  {% assign field = 'tags' %}
  {%- include views/segments.html -%}

{%- endif -%}
