#!/bin/bash -e

# Handwriting font generator
# By J.J. Vens
# October 2011

# This shellscript produces a font given an input image containing the characters.
# It depends on the following programs:
# - ImageMagick
# - Ocrad
# - Potrace
# - FontForge

SIZE="3000x3000"
# resize factor for ImageMagick's convert, larger values = more detail
# (but smaller values = faster processing!)

SMOOTHNESS="0.5"
# amount of blur before converting to bitmap, larger values = simpler shapes

THICKNESS="90%"
# threshold for converting to bitmap, larger values = more black = thicker lines

OVERVIEW_TYPE=74
# from the README of ocrad:
# 7X - X = 0 Show page as bitmap.
#      X = 1 Show page as bitmap with marked zones.
#      X = 2 Show page as bitmap with marked lines.
#      X = 4 Show page as bitmap with marked characters.

if [ -z "$1" ]
then
  echo "Usage: $0 filename"
  exit 0
fi

echo -n 'Scaling image... '
if [ ! -e "$1.scaled.jpg" ]
then
    convert "$1" -resize $SIZE "$1.scaled.jpg"
    echo "saved as $1.scaled.jpg"
else
    echo "not necessary, $1.scaled.jpg already exists"
fi

echo -n 'Blurring image... '
if [ ! -e "$1.blurred.jpg" ]
then
    convert "$1.scaled.jpg" -blur 0x$SMOOTHNESS "$1.blurred.jpg"
    echo "saved as $1.blurred.jpg"
else
    echo "not necessary, $1.blurred.jpg already exists"
fi

echo -n 'Converting image to black & white... '
if [ ! -e "$1.pbm" ]
then
  convert "$1.blurred.jpg" -threshold $THICKNESS "$1.pbm" 
  echo "saved as $1.pbm"
else
  echo "not necessary, $1.pbm already exists"
fi

echo -n 'Producing overview image... '
if [ ! -e "$1.overview.pbm" ]
then
  ocrad --charset=ascii -D $OVERVIEW_TYPE "$1.pbm" > "$1.overview.pbm"
  echo "saved overview image $1.overview.pbm"
else
  echo "not necessary, $1.overview.pbm already exists"
fi

echo -n 'Detecting character positions... '
if [ ! -e "$1.results.txt" ]
then
  ocrad --charset=ascii -x $1.results.txt $1.pbm > /dev/null
  echo "saved in $1.results.txt"
else
  echo "not necessary, $1.results.txt already exists"
fi

# calculate the minimum height of a character
# as the average height of all characters * .25
minsize=`cat "$1.results.txt" | awk '
	BEGIN{sum=0; count=0}
	/^line/{if ($6) {sum+=$6; count++}}
	END{print int(sum/count*.25)}'`

# save (only) the coordinates of all characters
areas=`cat "$1.results.txt" | grep -v "' '" | awk -v minsize=$minsize '
	/^[0-9]/{if (int($4) > minsize) print $1,$2,$3,$4","}' \
	| tr -d ";\n"`

echo -n "Generating files in subdir $1.letters"
if [ ! -d "$1.letters" ]
then
  mkdir "$1.letters"
fi
IFS=","
i=1
for area in $areas
do
    if [ ! -e "$1.letters/$i.pbm" ]
    then
	eval "pnmcut $area $1.pbm" > "$1.letters/$i.pbm"
	echo -n "."
    fi
    i=$((i+1))
done
echo
unset IFS

echo 'Converting bitmaps to paths'
cd "$1.letters"
for f in *.pbm
do
  potrace -b svg "$f"
  echo -n "."
done
echo
