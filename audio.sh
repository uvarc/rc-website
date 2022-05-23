#!/bin/bash

# Generate audio
aws polly synthesize-speech --voice-id Joanna --output-format mp3 --text file://index.aud --engine neural audio.mp3

# Upload to path
# aws s3 cp audio.mp3 s3://uvarc-media/project/ {{ project name }} /audio.mp3
