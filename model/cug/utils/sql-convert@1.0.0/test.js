var testArray = [];
testArray[1] = "fname = '商超'";
testArray[2] = "fname != '商超'";
testArray[3] = "flevel > 10";
testArray[4] = "fcode is  null";
testArray[5] = "fcode is not null";
testArray[6] = "fcode in ('3303','3304')";
testArray[7] = "fcode not in (\"3303\",\"3304\")";
testArray[8] = "not (fscale = 20)";
testArray[9] = "not (fname is null )";
testArray[10] = "flevel < 10  or ftype = 'cityriver'";
testArray[11] = "(fscale <= 20) and ((flevel < 10) or ftype = 'cityriver')";
testArray[12] = "(fscale <= 20 and (flevel < 10 or ftype = 'cityriver')) and fcode in ('3303','3304')";
testArray[13] = "fscale <= 20 and (flevel < 10 or ftype = 'cityriver')";
testArray[14] = "fscale  <= 20 and  not  ( fname  is  null )  and ( fname   in  ('七星岛','海礁') or   fcode  in  ('2702011204','2702012204','2702013204'))";
testArray[15] = "not  ( fname  is  null ) and  fcode = 7512020106";
testArray[16] = "fcode in (\"3303\")";

var sqlconvert = require('./index');
for (let i = 1; i < 16; i++) {
    let res = sqlconvert(testArray[i]);
    console.log(res);
}
